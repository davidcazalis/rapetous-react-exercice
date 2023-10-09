import { useApiClient } from "@/components/ApiClient";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
    </>
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
