import { useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { userExerciseListState, userExerciseExcelState } from 'atoms/exerciseAtom'

import { useMutation } from '@tanstack/react-query'
import { postExerciseDownload } from 'api/exercise'

import { saveAs } from 'file-saver'

import styled from 'styled-components'

import { DetailCard, Button } from 'components'

const ExerciseCalc = () => {
  const userExerciseList = useRecoilValue(userExerciseListState)
  const [userExerciseExcel, setUserExerciseExcel] = useRecoilState(userExerciseExcelState)

  const getTotWeight = () => {
    return userExerciseList.reduce((acc, cur) => {
      const { each_tot_weight: weight = 0 } = cur
      return acc + weight
    }, 0)
  }

  const mutation = useMutation({
    mutationFn: (data) => postExerciseDownload(data),
    onSuccess: (res) => {
      const filename = 'healthgg_exercise_volume.xlsx'
      saveAs(new Blob([res.data]), filename)
    },
    onError: (err) => {
      console.error('postExerciseDownload err', err)
    },
  })

  const downloadExcel = () => {
    mutation.mutate({ data: userExerciseExcel })
  }

  useEffect(() => {
    const exerciseExcelData = userExerciseList.reduce((acc, cur) => {
      const { reps = 0, weight = 0, sets = 0 } = cur?.grams || {}
      const temp = {
        fitness_machine_name: cur?.fitness_machine_name || '',
        repetition: +reps,
        set: +sets,
        weight: +weight,
        total_weight: cur?.each_tot_weight || 0,
      }
      acc.push(temp)
      return acc
    }, [])
    setUserExerciseExcel(exerciseExcelData)
  }, [userExerciseList])

  return (
    <>
      <WrapExcelSection>
        <SectionTitleH1>총 운동볼륨 계산하기</SectionTitleH1>
        <Button onClick={() => downloadExcel()}>엑셀파일 다운로드</Button>
      </WrapExcelSection>
      <section>
        <SectionTitleDiv>
          <p>총 운동볼륨</p>
          <p>{getTotWeight()}kg</p>
        </SectionTitleDiv>
        <WrapCardsDiv>
          <DetailCard type="exercise" list={userExerciseList} />
        </WrapCardsDiv>
      </section>
    </>
  )
}

export default ExerciseCalc

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

const SectionTitleH1 = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme }) => theme.fontWeight.subTitle};
`

const SectionTitleDiv = styled.div`
  text-align: center;
  & > p:first-child {
    font-size: ${({ theme }) => theme.fontSize.medium};
    font-weight: ${({ theme }) => theme.fontWeight.subTitle};
  }
  & > p:last-child {
    font-size: ${({ theme }) => theme.fontSize.title};
    font-weight: ${({ theme }) => theme.fontWeight.title};
    color: ${({ theme }) => theme.colors.mainBlue};
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
