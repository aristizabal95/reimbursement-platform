import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ApprovePage from './pages/ApprovePage'
import MainLayout from './Layouts/MainLayout'
import InvoiceDetail from './components/InvoiceDetail/InvoiceDetail'
import CreateEvent from './pages/CreateEvent'
import Login from './components/Login/Login'
import RequiereAuth from './components/RequiereAuth/RequiereAuth'

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<MainLayout></MainLayout>}>
    <Route element={<RequiereAuth />}>
      <Route path='/' element={<HomePage></HomePage>}></Route>
      <Route path='/task' element={<ApprovePage></ApprovePage>}></Route>
      <Route path='/invoice-detail/:reimbursmentId' element={<InvoiceDetail></InvoiceDetail>}></Route>
      <Route path='/add-event' element={<CreateEvent></CreateEvent>}></Route>
    </Route>
    <Route path='/login' element={<Login></Login>}></Route>
  </Route>
  )
)

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App
