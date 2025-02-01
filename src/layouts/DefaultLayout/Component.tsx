import { Outlet } from 'react-router';

export const Component = () => {
  return (
    <>
      <nav className="block w-full bg-blue-900 px-4 py-4 text-white">
        Navbar here
      </nav>
      <Outlet />
    </>
  );
};

Component.displayName = 'DefaultLayout';
