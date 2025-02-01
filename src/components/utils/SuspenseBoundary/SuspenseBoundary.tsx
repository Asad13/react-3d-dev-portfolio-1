import { Suspense } from 'react';
import ErrorBoundary from '@components/utils/ErrorBoundary';
import Loader from '@ui/Loader';
import type { ReactNode } from 'react';

interface SuspenseBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const SuspenseBoundary = ({ children, fallback }: SuspenseBoundaryProps) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={fallback !== undefined ? fallback : <Loader />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default SuspenseBoundary;
