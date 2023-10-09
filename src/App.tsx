import { useApiClient } from "@/components/ApiClient";

const Layout = () => {
  return (
    <div className="main">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<ErrorNotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
};
