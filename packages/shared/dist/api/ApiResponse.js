"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(statusCode, data = null, message = null) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
    static success(data, message = null) {
        return new ApiResponse(200, data, message);
    }
    static failure(message, statusCode = 400) {
        return new ApiResponse(statusCode, null, message);
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=ApiResponse.js.map