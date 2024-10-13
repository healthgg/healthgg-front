import { useRecoilValue } from 'recoil'
import { userExerciseListState } from 'atoms/exerciseAtom'

import { useMutation } from '@tanstack/react-query'
import { postExerciseDownload } from 'api/exercise'

import { saveAs } from 'file-saver'

import styled from 'styled-components'

import { DetailCard, Button } from 'components'

const ExerciseCalc = () => {
  const userExerciseList = useRecoilValue(userExerciseListState)

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
    mutation.mutate({ data: userExerciseList })
  }

  return (
    <>
      <WrapExcelSection>
        <SectionTitleH1>총 운동볼륨 계산하기</SectionTitleH1>
        <Button onClick={() => downloadExcel()}>엑셀파일 다운로드</Button>
      </WrapExcelSection>
      <section>
        <SectionTitleDiv>
          <p>운동볼륨</p>
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
