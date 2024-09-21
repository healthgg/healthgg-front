import { createPortal } from 'react-dom'

import Sidebar from './Sidebar'

const Portal = (props) => {
  const modalRoot = document.getElementById('modal')
  return createPortal(<Sidebar {...props} />, modalRoot)
}

export default Portal
