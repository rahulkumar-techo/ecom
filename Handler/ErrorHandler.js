 class Errorhandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends Errorhandler {
  constructor(message) {
    super(message, 400);
  }
}

class NotFoundError extends Errorhandler {
  constructor(message) {
    super(message, 404);
  }
}

class InternalServerError extends Errorhandler {
  constructor(message) {
    super(message, 500);
  }
}
export default Errorhandler;
export { BadRequestError, NotFoundError, InternalServerError };
