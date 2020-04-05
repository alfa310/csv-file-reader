/**
 * Represents an error that belongs to the Service layer.
 */

class InternalServerError extends Error {
  constructor(error, ...params) {
    super(...params);
    Error.captureStackTrace(this, InternalServerError);
    if (typeof error === 'string') {
      this.message = error;
    } else if (typeof error === 'object') {
      this.internalName = error.name;
      this.internalMessage = error.message;
      this.internalError = error;
      this.message = error.message;
    }
    this.name = 'InternalServerError';
    this.code = 'INTERNAL_SERVER_ERROR';
    this.status = 500;
  }
}

/**
 * Represents an error that belongs to the Data layer.
 */

class InternalDatabaseError extends Error {
  constructor(error, ...params) {
    super(...params);
    Error.captureStackTrace(this, InternalDatabaseError);
    if (typeof error === 'string') {
      this.message = error;
    } else if (typeof error === 'object') {
      this.internalName = error.name;
      this.internalMessage = error.message;
      this.internalError = error;
      this.message = error.message;
    }
    this.name = 'InternalDatabaseError';
    this.code = 'INTERNAL_DATABASE_ERROR';
    this.status = 500;
  }
}

/**
 * Represents an error that comes from the input being not valid.
 */
class InputValidationError extends Error {
  constructor(error, ...params) {
    super(...params);
    Error.captureStackTrace(this, InputValidationError);
    if (typeof error === 'string') {
      this.message = error;
    } else if (typeof error === 'object') {
      this.internalName = error.name;
      this.internalMessage = error.message;
      this.internalError = error;
      this.message = error.message;
    }
    this.name = 'InputValidationError';
    this.code = 'INPUT_VALIDATION_ERROR';
    this.status = 400;
  }
}

module.exports = {
  InternalServerError,
  InputValidationError,
  InternalDatabaseError
};