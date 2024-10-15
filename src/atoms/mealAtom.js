import { atom } from 'recoil'
import { BREAKFAST, LUNCH, DINNER } from 'constants/responseKeys'

export const userMealListState = atom({
  key: 'userMealListState',
  default: {
    [BREAKFAST]: [],
    [LUNCH]: [],
    [DINNER]: [],
  },
})

export const userMealExcelState = atom({
  key: 'userMealExcelState',
  default: {
    food_name: '',
    calory: '',
    protein: '',
    carbohydrate: '',
    fat: '',
  },
})

export const mealGramState = atom({
  key: 'mealGramState',
  default: '',
})

export const mealTitleState = atom({
  key: 'mealTitleState',
  default: '',
})

export const mealDescState = atom({
  key: 'mealDescState',
  default: '',
})
