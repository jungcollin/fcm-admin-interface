export class ApiStatus {
    static Success = 200;
    static Error = 500;
}

export class ApiResponse {
    success: boolean;
    message: any;
    result: any;

    constructor(_success: boolean, _message?: any, _result?: any) {
        if (_message) {
            console.error("API fail: ", _message);
        }

        this.success = _success;
        this.message = _message;
        this.result = _result;
    }
}