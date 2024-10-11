import { atom } from 'recoil'

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
