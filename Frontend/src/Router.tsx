import React from "react";
import { Route, Routes } from "react-router-dom";
import { urlHome, urlNewRequest } from "./constants/tabs";
import { Loader } from "./components/Loader";
import NotFoundPage from "./pages/NotFoundPage";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const NewReimbursementPage = React.lazy(
  () => import("./pages/NewReimbursementPage"),
);

export function Router() {
  return (
    <Routes>
      <Route
        key={urlHome}
        path={urlHome}
        element={
          <React.Suspense fallback={<Loader />}>
            <HomePage />
          </React.Suspense>
        }
      />
      <Route
        key={urlNewRequest}
        path={urlNewRequest}
        element={
          <React.Suspense fallback={<Loader />}>
            <NewReimbursementPage />
          </React.Suspense>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
