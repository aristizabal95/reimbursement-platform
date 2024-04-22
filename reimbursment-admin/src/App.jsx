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

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<MainLayout></MainLayout>}>
    <Route path='/' element={<HomePage></HomePage>}></Route>
    <Route path='/task' element={<ApprovePage></ApprovePage>}></Route>
    <Route path='/invoice-detail/:invoiceId' element={<InvoiceDetail></InvoiceDetail>}></Route>

  </Route>
  )
)

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App
