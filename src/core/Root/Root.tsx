import { ScrollRestoration, Outlet, useNavigation } from 'react-router';

const Root = () => {
  const navigation = useNavigation();

  return (
    <>
      <div className={navigation.state === 'loading' ? 'page-loading' : ''}>
        <Outlet />
      </div>
      <ScrollRestoration />
    </>
  );
};

export default Root;
