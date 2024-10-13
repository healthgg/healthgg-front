import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userMealListState } from 'atoms/mealAtom'

import styled from 'styled-components'

import { v4 as uuidv4 } from 'uuid'

import { DetailCard } from 'components'
import { BREAKFAST, LUNCH, DINNER } from 'constants/responseKeys'

const MealCalc = () => {
  const [curSubTab, setCurSubTab] = useState(BREAKFAST)
  const userMealList = useRecoilValue(userMealListState)

  const repastList = [BREAKFAST, LUNCH, DINNER]

  return (
    <>
      <WrapExcelSection>
        <SectionTitleH1>영양성분 계산하기</SectionTitleH1>
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
  margin-bottom: 30px;
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
