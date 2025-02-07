import { RouterProvider, createBrowserRouter } from 'react-router';
import { DefaultRouter } from './routers';

const App = () => {
  const router = createBrowserRouter([...DefaultRouter], {
    basename: import.meta.env.VITE_APP_BASE_PATH ?? '/',
  });

  return <RouterProvider router={router} />;
};

export default App;
