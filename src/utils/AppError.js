export default class AppError extends Error {
  constructor(error, statusCode) {
    if (typeof error === 'object' && error !== null) {
      super(error.message);

      console.log('ERROR NAME', error.name);
      console.log('ERROR CODE', error.code);
      this.name = error.name || 'Error';
      this.code = error.code;
      this.statusCode = statusCode || 500;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.details = { ...error };
    } else {
      super(error);

      this.statusCode = statusCode || 500;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.name = error?.name || 'ApiError';

      // Error.captureStackTrace(this, this.constructor);
    }
  }
}
