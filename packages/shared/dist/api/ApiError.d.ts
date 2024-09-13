export declare class ApiError extends Error {
    statusCode: number;
    data: object | null;
    success: boolean;
    errors: any;
    constructor(statusCode?: number, message?: string, errors?: never[], stack?: any);
}
