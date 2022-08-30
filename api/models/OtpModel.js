// import importent files
import mongoose from "mongoose";

const OtpModel = mongoose.Schema({
  otp: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  exp: {
    type: Number,
    default: new Date(Date.now() + 1000 * 60 * 5).getTime(),
  },
});

const Otpmodel = mongoose.model("Otp", OtpModel);

export default Otpmodel;
