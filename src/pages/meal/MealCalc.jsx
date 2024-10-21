import { useState, useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { userMealListState, userMealExcelState } from 'atoms/mealAtom'

import { useMutation } from '@tanstack/react-query'
import { postMealDownload } from 'api/meal'

import styled from 'styled-components'

import { v4 as uuidv4 } from 'uuid'
import { saveAs } from 'file-saver'

import { DetailCard, Button } from 'components'
import { BREAKFAST, LUNCH, DINNER } from 'constants/responseKeys'

const MealCalc = () => {
  const userMealList = useRecoilValue(userMealListState)
  const [userMealExcel, setUserMealExcel] = useRecoilState(userMealExcelState)
  const [curSubTab, setCurSubTab] = useState(BREAKFAST)

  const repastList = [BREAKFAST, LUNCH, DINNER]

  const mutation = useMutation({
    mutationFn: (data) => postMealDownload(data),
    onSuccess: (res) => {
      const filename = 'healthgg_meal_volume.xlsx'
      saveAs(new Blob([res.data]), filename)
    },
    onError: (err) => {
      console.error('postMealShare err', err)
    },
  })

  const downloadExcel = () => {
    mutation.mutate({ data: userMealExcel })
  }

  useEffect(() => {
    const mealExcelData = Object.entries(userMealList).reduce(
      (acc, [key, values]) => {
        const targetKey = key === BREAKFAST ? 'Breakfast' : key === LUNCH ? 'Lunch' : 'Dinner'
        values.forEach((val) => {
          acc[targetKey].push({
            food_name: val.food_name,
            calory: +val.nutrient.calory,
            protein: +val.nutrient.protein,
            carbohydrate: +val.nutrient.carbohydrate,
            fat: +val.nutrient.fat,
          })
        })
        return acc
      },
      {
        Breakfast: [],
        Lunch: [],
        Dinner: [],
      },
    )
    setUserMealExcel(mealExcelData)
  }, [userMealList])

  // 총 섭취량 계산 함수
  const getTotalNutrients = (meals) => {
    return meals.reduce(
      (totals, meal) => {
        return {
          calory: Math.round((totals.calory + (Number(meal?.nutrient?.calory) || 0)) * 10) / 10,
          protein: Math.round((totals.protein + (Number(meal?.nutrient?.protein) || 0)) * 10) / 10,
          carbohydrate: Math.round((totals.carbohydrate + (Number(meal?.nutrient?.carbohydrate) || 0)) * 10) / 10,
          fat: Math.round((totals.fat + (Number(meal?.nutrient?.fat) || 0)) * 10) / 10,
        }
      },
      { calory: 0, protein: 0, carbohydrate: 0, fat: 0 },
    )
  }

  const totalNutrients = getTotalNutrients(userMealList?.[curSubTab] || [])

  const totalNutrientsSum = getTotalNutrients(
    (userMealList?.[BREAKFAST] || []).concat(userMealList?.[LUNCH] || []).concat(userMealList?.[DINNER] || []),
  )
  return (
    <>
      <WrapExcelSection>
        <SectionTitleH1>영양성분 계산하기</SectionTitleH1>
        <Button onClick={() => downloadExcel()}>엑셀파일 다운로드</Button>
      </WrapExcelSection>

      <section>
        <SectionTitleH1>하루 총 섭취량</SectionTitleH1>
        <SectionTotalNutrientsSum>
          <p>
            칼로리 <br /> {totalNutrientsSum.calory}kcal
          </p>
          <p>
            단백질 <br /> {totalNutrientsSum.protein}g
          </p>
          <p>
            탄수화물 <br /> {totalNutrientsSum.carbohydrate}g
          </p>
          <p>
            지방 <br /> {totalNutrientsSum.fat}g
          </p>
        </SectionTotalNutrientsSum>
        <LinedTabUl>
          {repastList.map((repast) => (
            <LinedTabLi key={uuidv4()} $curValue={curSubTab === repast}>
              <LinedButton type="button" $curValue={curSubTab === repast} onClick={() => setCurSubTab(repast)}>
                {repast}
              </LinedButton>
            </LinedTabLi>
          ))}
        </LinedTabUl>
        <WrapTableDiv>
          <SelectedTable>
            <thead>
              <tr>
                <th width="36%">영양소</th>
                <th width="16%">열량</th>
                <th width="16%">단백질</th>
                <th width="16%">탄수화물</th>
                <th width="16%">지방</th>
              </tr>
            </thead>
            <tbody>
              {userMealList?.[curSubTab]?.map((list) => (
                <tr key={uuidv4()}>
                  <td>
                    {list.food_name}
                    {`(${list.food_weight}g)`}
                  </td>
                  <td>{list?.nutrient?.calory}kcal</td>
                  <td>{list?.nutrient?.protein}g</td>
                  <td>{list?.nutrient?.carbohydrate}g</td>
                  <td>{list?.nutrient?.fat}g</td>
                </tr>
              ))}
            </tbody>
            <tbody>
              <tr>
                <td>총 섭취량</td>
                <td>{totalNutrients.calory}kcal</td>
                <td>{totalNutrients.protein}g</td>
                <td>{totalNutrients.carbohydrate}g</td>
                <td>{totalNutrients.fat}g</td>
              </tr>
            </tbody>
          </SelectedTable>
        </WrapTableDiv>
        <WrapCardsDiv>
          <DetailCard type="food" list={userMealList?.[curSubTab]} />
        </WrapCardsDiv>
      </section>
    </>
  )
}

export default MealCalc

const WrapExcelSection = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  & > button {
    padding: 8px 12px;
    background-color: #207345;
    font-size: ${({ theme }) => theme.fontSize.regular};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: white;
  }
`

const SectionTotalNutrientsSum = styled.h2`
  display: flex;
  justify-content: center;
  gap: 30px;
  & > p {
    text-align: center;
    margin-top: 12px;
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.fontSize.medium};
    font-weight: ${({ theme }) => theme.fontWeight.subTitle};
  }
`

const SectionTitleH1 = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme }) => theme.fontWeight.subTitle};
`

const LinedTabUl = styled.ul`
  display: flex;
  height: 40px;
  margin-top: 16px;
`

const LinedTabLi = styled.li`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-bottom: ${({ theme, $curValue }) => ($curValue ? `2px solid ${theme.colors.mainBlue}` : '')};
`

const LinedButton = styled.button`
  color: ${({ theme, $curValue }) => ($curValue ? theme.colors.mainBlue : theme.colors.typoBlack)};
  font-weight: ${({ theme, $curValue }) => ($curValue ? theme.fontWeight.title : theme.fontWeight.medium)};
`

const WrapTableDiv = styled.div`
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #cacaca;
`

const SelectedTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  tr {
    border-top: 1px solid #cacaca;
  }
  thead > tr {
    border-top: none;
  }
  th,
  td {
    padding: 8px 0px;
    font-size: ${({ theme }) => theme.fontSize.regular};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    text-align: center;
  }
`

const WrapCardsDiv = styled.div`
  & > ul {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 15px;
    margin-top: 20px;
    width: 100%;
    & > li {
      display: flex;
      margin: 0 auto;
      padding: 10px 20px;
      gap: 20px;
      max-width: 300px;
      background-color: ${({ theme }) => theme.colors.bgWhite};
      border: 1px solid #cacaca;
      border-radius: 5px;
      img {
        width: 90px;
        height: 90px;
        border: 1px solid #cacaca;
      }
      div {
        gap: 3px;
        p {
          display: flex;
          span {
            font-size: 14px !important;
          }
          span:first-child {
            width: 70px;
          }
        }
      }
    }
  }
`