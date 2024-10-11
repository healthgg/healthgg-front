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

export const onermExerciseState = atom({
  key: 'onermexercise',
  default: 'deadlift',
})

export const onermWeightState = atom({
  key: 'onermweightState',
  default: '',
})

export const onermRepsState = atom({
  key: 'onermrepsState',
  default: '',
})

export const onermValueState = atom({
  key: 'onermValueState',
  default: { deadlift: 0, squat: 0, benchpress: 0 },
})
