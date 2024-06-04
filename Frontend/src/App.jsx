import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Login from "./components/Login";
import RequiereAuth from "./components/RequiereAuth";
import InvoiceForm from "./components/InvoiceForm";
import ReimbursementDetail from "./components/ReimbursementDetail";
import TaskList from "./components/TaskList";
import ReimbursmentList from "./components/ReimbursmentList";
import NewEventForm from "./components/NewEventForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<RequiereAuth />}>
        <Route element={<MainLayout></MainLayout>}>
          <Route
            path="/"
            element={<ReimbursmentList></ReimbursmentList>}
          ></Route>
          <Route path="/task" element={<TaskList></TaskList>}></Route>
          <Route
            path="/invoice-detail/:reimbursementId/:eventId"
            element={<ReimbursementDetail></ReimbursementDetail>}
          ></Route>
          <Route
            path="/new-invoice/:reimbursementId/:eventId"
            element={<InvoiceForm></InvoiceForm>}
          ></Route>

          <Route
            path="/add-event"
            element={<NewEventForm></NewEventForm>}
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
