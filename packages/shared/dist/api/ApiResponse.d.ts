export declare class ApiResponse<T> {
    statusCode: number;
    data: T | null;
    message: string | null;
    constructor(statusCode: number, data?: T | null, message?: string | null);
    static success<T>(data: T, message?: string | null): ApiResponse<T>;
    static failure(message: string, statusCode?: number): ApiResponse<null>;
}
