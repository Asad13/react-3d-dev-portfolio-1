import { RouterProvider, createBrowserRouter } from 'react-router';
import { DefaultRouter } from './routers';

const App = () => {
  const router = createBrowserRouter([...DefaultRouter]);

  return <RouterProvider router={router} />;
};

export default App;
