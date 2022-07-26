import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'animate.css/animate.css'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'

// ** Reactstrap Imports
import { Card, CardHeader, CardBody, CardTitle, Button, Row, Col } from 'reactstrap'

const MySwal = withReactContent(Swal)

export const confirmAlert = (
    title = 'Are you sure?', 
    text = "You won't be able to revert this!", 
    icon = 'warning',
    showCancelButton = true,
    confirmButtonText = 'Yes, delete it!'
) => {
    return MySwal.fire({
      title,
      text,
      icon,
      showCancelButton,
      confirmButtonText,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    })
  }

