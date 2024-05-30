import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ApprovePage from "./pages/ApprovePage";
import MainLayout from "./Layouts/MainLayout";
import InvoiceDetail from "./components/ReimbursementDetail";
import CreateEvent from "./pages/CreateEvent";
import Login from "./components/Login";
import RequiereAuth from "./components/RequiereAuth";
import InvoiceForm from "./components/InvoiceForm";
import ReimbursementDetail from "./components/ReimbursementDetail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<RequiereAuth />}>
        <Route element={<MainLayout></MainLayout>}>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/task" element={<ApprovePage></ApprovePage>}></Route>
          <Route
            path="/invoice-detail/:reimbursementId/:eventId"
            element={<ReimbursementDetail></ReimbursementDetail>}
          ></Route>
          <Route
            path="/new-invoice/:reimbursementId/::eventId"
            element={<InvoiceForm></InvoiceForm>}
          ></Route>
          <Route
            path="/add-event"
            element={<CreateEvent></CreateEvent>}
          ></Route>
        </Route>
      </Route>
      <Route path="/login" element={<Login></Login>}></Route>
    </Route>,
  ),
);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
