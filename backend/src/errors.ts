export abstract class CodedError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
    };
  }
}

export abstract class DetailedCodedError extends CodedError {
  details: Object;

  constructor(code: string, message: string, details: Object) {
    super(code, message);
    this.details = details;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      details: this.details,
    };
  }
}

export class NotFoundError extends CodedError {
  constructor() {
    super('NOT_FOUND', 'Page not found');
  }
}

export class ResourceNotFoundError extends CodedError {
  constructor() {
    super('RESOURCE_NOT_FOUND', 'Resource not found');
  }
}
