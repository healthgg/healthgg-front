import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Main, OneRmCalc, ProteinCalc } from 'pages'
import { Meal, MealCalc, MealDetail, MealList } from 'pages/meal'
import { Exercise, ExerciseCalc, ExerciseDetail, ExerciseList } from 'pages/exercise-volume'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path={'/'} element={<Main />} />
          <Route path={'/1rm-calc'} element={<OneRmCalc />} />
          <Route path={'/protein-calc'} element={<ProteinCalc />} />
          <Route path={'/meal/*'}>
            <Route path={''} element={<Meal />} />
            <Route path={'calc'} element={<MealCalc />} />
            <Route path={':id'} element={<MealDetail />} />
            <Route path={'list'} element={<MealList />} />
          </Route>
          <Route path={'/exercise-volume/*'}>
            <Route path={''} element={<Exercise />} />
            <Route path={'calc'} element={<ExerciseCalc />} />
            <Route path={':id'} element={<ExerciseDetail />} />
            <Route path={'list'} element={<ExerciseList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
