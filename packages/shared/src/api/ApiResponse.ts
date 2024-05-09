class ApiResponse<T> {
  public statusCode: number;
  public data: T | null;
  public message: string | null;

  constructor(
    statusCode: number,
    data: T | null = null,
    message: string | null = null
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }

  static success<T>(data: T, message: string | null = null): ApiResponse<T> {
    return new ApiResponse<T>(200, data, message);
  }

  static failure(message: string, statusCode: number = 400): ApiResponse<null> {
    return new ApiResponse<null>(statusCode, null, message);
  }
}


export default ApiResponse