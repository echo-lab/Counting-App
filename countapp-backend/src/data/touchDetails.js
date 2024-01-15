import mongoose from "mongoose";

const touchDetailsSchema = new mongoose.Schema({
    touchData: Array,
    category: String,
    pageNumber: Number,
});

mongoose.model("TouchDetails", touchDetailsSchema);