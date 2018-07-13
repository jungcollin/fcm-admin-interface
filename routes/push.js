"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const util = require("util");
const admin = require("firebase-admin");
const apiUtils_1 = require("../scripts/utils/apiUtils");
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post("/", function (req, res, next) {
    req.checkBody('registrationToken', 'request for registrationToken').notEmpty();
    req.checkBody('data', 'request for data as json object').optional();
    req.checkBody('notification', 'request for notification as json object `title, body, badge`').optional();
    function validate() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield req.getValidationResult();
            if (!result.isEmpty()) {
                return res.status(400).json(new apiUtils_1.ApiResponse(false, 'There have been validation errors: ' + util.inspect(result.array())));
            }
            try {
                // This registration token comes from the client FCM SDKs.
                let registrationToken = req.body.registrationToken;
                let data = req.body.data;
                let notification = req.body.notification;
                // See the "Defining the message payload" section below for details
                // on how to define a message payload.
                let payload = { data: data, notification: notification };
                // Send a message to the device corresponding to the provided
                // registration token.
                let response = yield admin.messaging().sendToDevice(registrationToken, payload);
                // See the MessagingDevicesResponse reference documentation for
                // the contents of response.
                console.log("Successfully sent message:", JSON.stringify(response));
                return res.status(200).json(new apiUtils_1.ApiResponse(true, null, response));
            }
            catch (ex) {
                console.warn("Push fail: ", ex.message);
                return res.status(500).json(new apiUtils_1.ApiResponse(false, ex.message));
            }
        });
    }
    validate();
});
router.post("/multicast", function (req, res, next) {
    //@ts-ignore
    // My custom validation.
    req.checkBody('registrationTokens', 'request for registrationTokens').notEmpty().isArray();
    req.checkBody('data', 'request for data as json object').optional();
    req.checkBody('notification', 'request for notification as json object `title, body, badge`').optional();
    function validate() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield req.getValidationResult();
            if (!result.isEmpty()) {
                return res.status(400).json(new apiUtils_1.ApiResponse(false, 'There have been validation errors: ' + util.inspect(result.array())));
            }
            try {
                // This registration token comes from the client FCM SDKs.
                let registrationTokens = req.body.registrationTokens;
                let data = req.body.data;
                let notification = req.body.notification;
                if (registrationTokens.length > 1000) {
                    return res.status(500).json(new apiUtils_1.ApiResponse(false, "More than 1000 devices push not available"));
                }
                // See the "Defining the message payload" section below for details
                // on how to define a message payload.
                let payload = { data: data, notification: notification };
                // Send a message to the device corresponding to the provided
                // registration token.
                let response = yield admin.messaging().sendToDevice(registrationTokens, payload);
                // See the MessagingDevicesResponse reference documentation for
                // the contents of response.
                console.log("Successfully sent message:", JSON.stringify(response));
                return res.status(200).json(new apiUtils_1.ApiResponse(true, null, response));
            }
            catch (ex) {
                console.warn("Push fail: ", ex.message);
                return res.status(500).json(new apiUtils_1.ApiResponse(false, ex.message));
            }
        });
    }
    validate();
});
exports.PushAPI = router;
