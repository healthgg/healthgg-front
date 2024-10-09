import { createPortal } from 'react-dom'

import Sidebar from './Sidebar'
import MealDataModal from './MealDataModal'

const Portal = ({ type, data, onClose, onClick }) => {
  const modalRoot = document.getElementById('modal')
  const componentToRender = {
    sidebar: <Sidebar onClose={onClose} />,
    mealModal: <MealDataModal data={data} onClose={onClose} onClick={onClick} />,
  }

  return createPortal(componentToRender[type] ?? null, modalRoot)
}

export default Portal
