import { atom } from 'recoil'

export const userExerciseListState = atom({
  key: 'userExerciseListState',
  default: [],
})

export const userExerciseExcelState = atom({
  key: 'userExerciseExcelState',
  default: {
    fitness_machine_name: '',
    repetition: 0,
    set: 0,
    weight: 0,
    total_weight: 0,
  },
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
