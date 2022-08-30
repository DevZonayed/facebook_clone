// Import All Dependencies
import mongoose from "mongoose";

const UserModel = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    // trim: true
    index: {
      unique: true,
      partialFilterExpression: {
        username: {
          $type: "string",
        },
      },
    },
  },
  email: {
    type: String,
    index: {
      unique: true,
      partialFilterExpression: {
        email: {
          $type: "string",
        },
      },
    },
    // trim: true,
  },
  cell: {
    type: String,
    index: {
      unique: true,
      partialFilterExpression: {
        cell: {
          $type: "string",
        },
      },
    },
    // trim: true,
  },
  surname: {
    type: String,
    trim: true,
  },
  dateofbirth: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    Blob: ["male", "female", "custom"],
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: {
    type: Array,
  },
});

const User = mongoose.model("User", UserModel);

export default User;
