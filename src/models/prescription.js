import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  dosage: {
    type: Number,
    required: false,
  },
  frequency: {
    type: String,
    required: false,
    enum: ["Daily", "Weekly", "Monthly"],
  },
  date: {
    type: Date,
    required: false,
  },
  timing: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: false,
  },
});

export const PrescriptionModel =
  mongoose.models.PrescriptionsModel ||
  mongoose.model("PrescriptionsModel", prescriptionSchema);
