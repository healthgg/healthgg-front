import { createPortal } from 'react-dom'

import Sidebar from './Sidebar'
import MealDataModal from './MealDataModal'
import ExerciseDataModal from './ExerciseDataModal'
import ShareCalcModal from './ShareCalcModal'

const Portal = ({ portalType, dataFlag, data, onClose, onClick }) => {
  const modalRoot = document.getElementById('modal')
  const componentToRender = {
    sidebar: <Sidebar onClose={onClose} />,
    mealModal: <MealDataModal data={data} onClose={onClose} onClick={onClick} />,
    exerciseModal: <ExerciseDataModal data={data} onClose={onClose} onClick={onClick} />,
    shareCalcModal: <ShareCalcModal dataFlag={dataFlag} data={data} onClose={onClose} onClick={onClick} />,
  }

  return createPortal(componentToRender[portalType] ?? null, modalRoot)
}

export default Portal
