import mongoose from "mongoose";

const trainingTouchDetailsSchema = new mongoose.Schema({
    touchData: Array,
    category: String,
    pageNumber: Number,
});

mongoose.model("TrainingTouchDetails", trainingTouchDetailsSchema);