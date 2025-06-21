import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    age: {
      type: Number,
      min: 0,
      max: 120,
      default: null,
    },
    address: {
      street: {
        type: String,
        default: null,
      },
      city: {
        type: String,
        default: null,
      },
      state: {
        type: String,
        default: null,
      },
      zipCode: {
        type: String,
        default: null,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Patient", patientSchema);
