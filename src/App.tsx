import { Box } from '@mui/system'
import { Taxes } from './components/Taxes'
import { setLocale } from 'yup'
import yupFr from './constants/yup'

setLocale(yupFr)

function App() {
  return (
    <Box height="100vh" width="100vw">
      <Taxes />
    </Box>
  )
}

export default App
