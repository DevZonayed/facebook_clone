function handleError(err, req, res, next) {
  const { status, message, stack } = err;
  res.status(status).json({
    status,
    message,
    stack,
  });
}

export default handleError;
