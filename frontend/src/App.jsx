import Body from "./components/Body"
import {Toaster} from 'react-hot-toast'
import useAuth from './hooks/useAuth'

function App() {
  // Check authentication on app load
  useAuth();

  return (
    <>
      <Body/>
      <Toaster/>
    </>
  )
}

export default App
