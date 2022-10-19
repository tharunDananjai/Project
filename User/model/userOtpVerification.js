const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userOtpVerificationSchema = new Schema({
    userId: {type: String},
    otp: {type: String},
    createdAt: {type: Date},
    expiredAt: {type: Date}
});

const userOtpVerification = mongoose.model("userOtpVerification",userOtpVerificationSchema);