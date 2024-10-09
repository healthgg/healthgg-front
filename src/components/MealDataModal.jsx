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
    { id: 'calory', name: '열량' },
    { id: 'protein', name: '단백질' },
    { id: 'carbohydrate', name: '탄수화물' },
    { id: 'fat', name: '지방' },
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
            {nutritinalList.map(({ id, name }) => (
              <li key={uuidv4()}>
                <span>{name}</span>
                <span>{`${data?.nutrient?.[id]}${id === 'calory' ? 'kcal' : 'g'}`}</span>
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
  max-height: 550px;
  padding: 20px 30px;
  background: white;
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
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-align: justify;
`

const WrapInputDiv = styled.div`
  position: relative;
  & > label {
    display: none;
  }
  & > input {
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.bgWhite};
  }
  & > input:focus {
    outline: none;
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
  margin-bottom: 8px;
  text-align: left;
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fontWeight.subTitle};
`

const NutritinalInfoUl = styled.ul`
  display: flex;
  border: 1px solid #cacaca;
  border-radius: 5px;
  & li {
    flex: 1;
    & > span {
      display: inline-block;
      font-size: 12px;
      padding: 5px;
    }
    & > span:first-child {
      width: 100%;
      border-bottom: 1px solid #cacaca;
    }
  }
`

const WrapCtaDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  & > button {
    padding: 5px 8px;
    font-size: 14px;
  }
`
