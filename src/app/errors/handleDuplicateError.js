const handleDuplicateError = (err) => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSource = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: `${extractedMessage} is already exists`,
    errorSource,
  };
};
export default handleDuplicateError;