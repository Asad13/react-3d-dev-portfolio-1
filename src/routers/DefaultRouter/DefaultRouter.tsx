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
          {
            path: '/about',
            lazy: () => import('@pages/About/Component'),
          },
          {
            path: '/contact',
            lazy: () => import('@pages/Contact/Component'),
          },
          {
            path: '/projects',
            lazy: () => import('@pages/Projects/Component'),
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
