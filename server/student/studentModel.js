import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    roll_no: {
      type: Number,
      required: true,
      unique: true
    },

    className: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Student', studentSchema);
