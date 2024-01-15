import mongoose from "mongoose";

const practiceTouchDetailsSchema = new mongoose.Schema({
    touchData: Array,
    category: String,
    pageNumber: Number,
});

mongoose.model("PracticeTouchDetails", practiceTouchDetailsSchema);