import DefaultLayoutNavbar from '@components/navs/main';
import { Outlet } from 'react-router';

export const Component = () => {
  return (
    <>
      <DefaultLayoutNavbar />
      <Outlet />
    </>
  );
};

Component.displayName = 'DefaultLayout';
