import AppError from '../utils/AppError.js';

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.details.path}: ${err.details.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(\?.)*?/)[0]; // error message property name message
  const message = `Duplicate field value: ${value} Please use another value.`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.details.errors).map((el, _i) => el.path);

  const message = `There are ${errors.length} Invalid input data in path - [ ${errors} ]`;

  return new AppError(message, 400);
};

const handleJWTError = (_err) =>
  new AppError('Invalid Token! Please log in again.', 401);

const handleJWTExpError = (_err) =>
  new AppError('Login session expired please login again.', 401);

const sendErrorDev = (err, res) => {
  console.log(err);
  return res.status(err.statusCode).send({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = async (err, res, _req) => {
  return res.status(err.statusCode).send({
    status: err.status,
    message: err.message,
  });
};

export default (err, req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'dev') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'prod') {
    let error;

    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTError(err);
    if (err.name === 'TokenExpiredError') error = handleJWTExpError(err);

    sendErrorProd(error ? error : err, res, req);
  }
};
