class ApiResponse {
  constructor(status = null, message = null, data = null, entry_by = null) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.entry_by = entry_by;
  }
}

const ApiStatus = {
  SUCCESS: "success",
  NOT_FOUND: "not found",
  ERROR: "error",
  EXCEPTION: "exception",
  CONFLICT: "already exists",
  VALIDATION: "validation",
};

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQ: 400,
  NOT_FOUND: 404,
  UNAUTHORISED: 401,
  FORBIDDEN: 403,
  ERROR: 500,
  CONFLICT: 409,
  SERVICE_UNAVAILABLE: 503,
};

module.exports = { ApiResponse, ApiStatus, HTTP_STATUS };
