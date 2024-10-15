import { useRecoilState } from 'recoil'
import { mealGramState } from 'atoms/mealAtom'

import { v4 as uuidv4 } from 'uuid'

import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'

import { FOOD_IMG_ARR_KEY } from 'constants/responseKeys'

import Image from './Image'
import Button from './Button'

const MealDataModal = ({ data, onClose, onClick }) => {
  const [grams, setGrams] = useRecoilState(mealGramState)

  const gramBtnList = [10, 50, 100]
  const nutritinalList = [
    { id: 'calory', name: '열량', unit: 'kcal' },
    { id: 'protein', name: '단백질', unit: 'g' },
    { id: 'carbohydrate', name: '탄수화물', unit: 'g' },
    { id: 'fat', name: '지방', unit: 'g' },
  ]

  const onChangeInput = (e) => {
    const txt = e.target.value
    const regex = /^(0|[1-9]\d{0,3}|)$/
    if (regex.test(txt)) {
      setGrams(txt)
    } else {
      alert('0부터 9999까지의 숫자만 입력 가능합니다.')
    }
  }

  const onClickGram = (num) => setGrams((prev) => +prev + num)

  return (
    <BackgroundDiv>
      <MealDataSection>
        <p>{data.food_name}</p>
        <Image src={data[FOOD_IMG_ARR_KEY]} alt={`${data?.food_name} 이미지`} width="100%" height="150px" />
        {data?.food_notice && <MealDescP>{data?.food_notice}</MealDescP>}
        <WrapInputDiv>
          <label htmlFor="grams">식단 섭취량</label>
          <input
            id="grams"
            value={grams}
            placeholder="섭취량(g)을 적어주세요."
            onChange={onChangeInput}
            autoComplete="off"
          />
          {grams && <StyledClose onClick={() => setGrams('')} />}
        </WrapInputDiv>
        <WrapGramBtnDiv>
          {gramBtnList.map((num) => (
            <Button key={uuidv4()} color="mainBlue" onClick={() => onClickGram(num)}>{`+${num}g`}</Button>
          ))}
        </WrapGramBtnDiv>
        <div>
          <NutritinalInfoTitle>성분표</NutritinalInfoTitle>
          <NutritinalInfoUl>
            {nutritinalList.map(({ id, name, unit }) => (
              <li key={uuidv4()}>
                <span>{name}</span>
                <span>
                  {data?.nutrient?.[id]}
                  {unit}
                </span>
              </li>
            ))}
          </NutritinalInfoUl>
        </div>
        <WrapCtaDiv>
          <Button color="mainBlue" onClick={onClick}>
            추가
          </Button>
          <Button onClick={onClose}>취소</Button>
        </WrapCtaDiv>
      </MealDataSection>
    </BackgroundDiv>
  )
}

export default MealDataModal

const BackgroundDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  min-width: 320px;
  max-width: 430px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`

const MealDataSection = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 70%;
  height: fit-content;
  max-height: 720px;
  padding: 50px 30px;
  background: white;
  border-radius: 5px;
  text-align: center;
  overflow-x: hidden;
  overflow-y: auto;
  & > p:first-child {
    font-size: ${({ theme }) => theme.fontSize.subTitle};
    font-weight: ${({ theme }) => theme.fontWeight.subTitle};
  }
  & > img {
    object-fit: contain;
  }
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lightgray;
  }
`

const MealDescP = styled.p`
  margin-top: -10px;
  font-size: ${({ theme }) => theme.fontSize.regular};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-align: justify;
`

const WrapInputDiv = styled.div`
  position: relative;
  & > label {
    display: inline-block;
    margin-bottom: 8px;
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.regular};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    text-align: left;
  }
  & > input {
    padding: 12px 10px;
    width: 100%;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.bgWhite};
  }
  & > input:focus {
    outline: 2px solid ${({ theme }) => theme.colors.mainBlue};
  }
`

const StyledClose = styled(IoCloseOutline)`
  position: absolute;
  top: 50%;
  right: 10px;
  width: 20px;
  height: 20px;
  transform: translateY(-50%);
  cursor: pointer;
`

const WrapGramBtnDiv = styled.div`
  display: flex;
  gap: 15px;
  margin-top: -10px;
  & > button {
    padding: 5px 8px;
    font-size: 14px;
  }
`

const NutritinalInfoTitle = styled.p`
  margin-top: 10px;
  text-align: left;
  font-size: ${({ theme }) => theme.fontSize.regular};
  font-weight: ${({ theme }) => theme.fontWeight.subTitle};
`

const NutritinalInfoUl = styled.ul`
  display: flex;
  border: 1px solid #cacaca;
  border-radius: 5px;
  margin-top: 8px;
  & li {
    flex: 1;
    & > span {
      display: inline-block;
      font-size: 14px;
      padding: 6px 0;
      font-weight: ${({ theme }) => theme.fontWeight.subTitle};
    }
    & > span:first-child {
      width: 100%;
      border-bottom: 1px solid #cacaca;
    }
    & > span:last-child {
      font-weight: ${({ theme }) => theme.fontWeight.medium};
      color: ${({ theme }) => theme.colors.mainBlue};
    }
  }
`

const WrapCtaDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  gap: 15px;
  & > button {
    padding: 6px 16px;
    font-size: ${({ theme }) => theme.fontSize.regular};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`
