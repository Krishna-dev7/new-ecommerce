class APIResponse {
  constructor(statusCode, message="success", data) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.success = statusCode < 400;
  }
}

export default APIResponse;