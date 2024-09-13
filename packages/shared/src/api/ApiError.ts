// Define a custom error class for handling errors in an API context
export class ApiError extends Error {

  statusCode : number
  data :object | null
  success : boolean
  errors : any
  /**
   * Constructor for creating instances of ApiError
   * @param {number} statusCode - HTTP status code associated with the error.
   * @param {string} [message="Something went wrong"] - Human-readable error message.
   * @param {Array} [errors=[]] - Array for additional error details or context.
   * @param {string} [stack] - Optional stack trace associated with the error.
   */

  constructor(statusCode = 500, message = "Something went wrong", errors = [], stack? : any) {
    // Call the constructor of the base Error class with the provided message
    super(message);
    // Initialize properties of the ApiError instance
    this.statusCode = statusCode;  
    this.data = null;             
    this.message = message;       
    this.success = false;         
    this.errors = errors;         // Array to hold additional error details

    // If a stack is provided, set it; otherwise, capture the stack trace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Export the ApiError class as the default export from the module
