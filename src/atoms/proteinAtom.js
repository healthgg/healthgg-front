import { atom } from 'recoil'

export const proteinPurpose = atom({
  key: 'proteinpurpose',
  default: 'muscle_gain',
})

export const proteinGender = atom({
  key: 'proteingender',
  default: 'male',
})

export const proteinWeight = atom({
  key: 'proteinweight',
  default: '',
})

export const proteinResult = atom({
  key: 'proteinresult',
  default: 0,
})
