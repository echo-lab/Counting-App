import mongoose from "mongoose";

const userDetailsSchema = new mongoose.Schema({
    uname: String,
    answers: {
        baselineTrainingAnswers: { type: String, default: null },
        baselineTraining2Answers: { type: String, default: null },
        TouchTrainingAnswers: { type: String, default: null },
        animationTrainingAnswers: { type: String, default: null },
        touchTestAnswers: { type: String, default: null },
        animationTestAnswers: { type: String, default: null },
        baselineTestAnswers: { type: String, default: null },
        baselineTest2Answers: { type: String, default: null },
        practiceAnswers: { type: String, default: null },
      },
});

mongoose.model("UserInfo",userDetailsSchema);