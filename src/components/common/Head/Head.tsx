import { Helmet } from 'react-helmet';
import type { HelmetProps } from 'react-helmet';
import { APP_NAME } from '@constants/app';

const Head = ({ title, children, ...args }: HelmetProps) => {
  return (
    <Helmet {...args}>
      <title>
        {APP_NAME} {title !== undefined ? `- ${title}` : ''}
      </title>
      {children}
    </Helmet>
  );
};

export default Head;
