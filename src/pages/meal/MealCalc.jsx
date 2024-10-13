import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userMealListState } from 'atoms/mealAtom'

import { useMutation } from '@tanstack/react-query'
import { postMealDownload } from 'api/meal'

import styled from 'styled-components'

import { v4 as uuidv4 } from 'uuid'
import { saveAs } from 'file-saver'

import { DetailCard, Button } from 'components'
import { BREAKFAST, LUNCH, DINNER } from 'constants/responseKeys'

const MealCalc = () => {
  const [curSubTab, setCurSubTab] = useState(BREAKFAST)
  const userMealList = useRecoilValue(userMealListState)

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
    mutation.mutate({
      data: {
        Breakfast: userMealList[BREAKFAST],
        Lunch: userMealList[LUNCH],
        Dinner: userMealList[DINNER],
      },
    })
  }

  return (
    <>
      <WrapExcelSection>
        <SectionTitleH1>영양성분 계산하기</SectionTitleH1>
        <Button onClick={() => downloadExcel()}>엑셀파일 다운로드</Button>
      </WrapExcelSection>
      <section>
        <SectionTitleH1>총 섭취량</SectionTitleH1>
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
    padding: 5px 8px;
    background-color: #207345;
    font-size: 14px;
    color: white;
  }
`

const SectionTitleH1 = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme }) => theme.fontWeight.subTitle};
`

const LinedTabUl = styled.ul`
  display: flex;
  height: 40px;
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
    padding: 5px;
    font-size: 12px;
    text-align: center;
  }
`

const WrapCardsDiv = styled.div`
  & > ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 15px;
    margin-top: 20px;
    width: 100%;
    & > li {
      display: flex;
      padding: 10px;
      gap: 8px;
      background-color: ${({ theme }) => theme.colors.bgWhite};
      border: 1px solid #cacaca;
      border-radius: 5px;
      img {
        width: 60px;
        height: 60px;
        border: 1px solid #cacaca;
      }
      div {
        gap: 3px;
        p {
          display: flex;
          span {
            font-size: 12px !important;
          }
          span:first-child {
            width: 50px;
          }
        }
      }
    }
  }
`
