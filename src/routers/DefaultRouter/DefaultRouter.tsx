import type { RouteObject } from 'react-router';
import Root from '@core/Root';
import ErrorComp from '@components/utils/ErrorComp';

const DefaultRouter: Array<RouteObject> = [
  {
    element: <Root />,
    errorElement: <ErrorComp />,
    children: [
      {
        lazy: () => import('@layouts/DefaultLayout/Component'),
        children: [
          {
            path: '/',
            lazy: () => import('@pages/Home/Component'),
          },
        ],
      },
      // For pages with different layout create a child here
      // Not Found Route - 404
      {
        path: '*',
        lazy: () => import('@pages/NotFound/Component'),
      },
    ],
  },
];

export default DefaultRouter;
