"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiStatus {
}
ApiStatus.Success = 200;
ApiStatus.Error = 500;
exports.ApiStatus = ApiStatus;
class ApiResponse {
    constructor(_success, _message, _result) {
        if (_message) {
            console.error("API fail: ", _message);
        }
        this.success = _success;
        this.message = _message;
        this.result = _result;
    }
}
exports.ApiResponse = ApiResponse;
