import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './Layouts/MainLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<MainLayout></MainLayout>}>
    <Route path='/task' element={<HomePage></HomePage>}></Route>
  </Route>
  )
)

const App = () => {
  
  return <RouterProvider router={router}></RouterProvider>

}

export default App
