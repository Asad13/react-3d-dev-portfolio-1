type Alert = {
  type: 'danger' | 'success';
  text: string;
};

const Alert = ({ type, text }: Alert) => {
  return (
    <div className="fixed top-10 right-0 left-0 z-20 flex items-center justify-center">
      <div
        className={`p-2 ${
          type === 'danger' ? 'bg-red-800' : 'bg-blue-800'
        } flex items-center leading-none text-indigo-100 lg:inline-flex lg:rounded-full`}
        role="alert"
      >
        <p
          className={`flex rounded-full ${
            type === 'danger' ? 'bg-red-500' : 'bg-blue-500'
          } mr-3 px-2 py-1 text-xs font-semibold uppercase`}
        >
          {type === 'danger' ? 'Failed' : 'Success'}
        </p>
        <p className="mr-2 text-left">{text}</p>
      </div>
    </div>
  );
};

export default Alert;
