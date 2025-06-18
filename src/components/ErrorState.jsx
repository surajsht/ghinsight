const ErrorState = ({ message }) => {
  return (
    <div className="mt-8 rounded-lg bg-red-100 p-4 text-center text-red-600 dark:bg-[#FCABAB] dark:text-black">
      <p>⚠️ {message}</p>
    </div>
  );
};

export default ErrorState;
