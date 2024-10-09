import { atom } from 'recoil'

export const userExerciseListState = atom({
  key: 'userExerciseListState',
  default: [],
})

export const exerciseGramState = atom({
  key: 'exerciseGramState',
  default: {
    reps: '',
    weight: '',
    sets: '',
  },
})

export const eachTotalWeightState = atom({
  key: 'eachTotalWeightState',
  default: 0,
})
