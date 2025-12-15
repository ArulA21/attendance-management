import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    roll: {
      type: Number,
      required: true,
    },
    std: {
      type: Number,
      required: true,
    },

    // OWNER OF STUDENT
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Roll must be unique PER USER (not globally)
studentSchema.index({ roll: 1, user: 1 }, { unique: true });

export default mongoose.model("Student", studentSchema);
