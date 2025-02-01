import { useRouteError, Link, useNavigate } from 'react-router';

const ErrorComp = () => {
  const error = useRouteError();
  if (import.meta.env.DEV) console.error(error);

  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <p className="text-center text-red-600">Something went wrong...</p>
      <div>
        <p>
          <button onClick={() => navigate(0)}>Refresh Page</button>
        </p>
        <p>
          <Link to="/">Go to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default ErrorComp;
