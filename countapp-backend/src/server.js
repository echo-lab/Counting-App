import {connectToDb} from './db.js';
import express from 'express';
import './data/userDetails.js';
import './data/touchDetails.js';
import './data/trainingTouchDetails.js';
import './data/practiceTouchDetails.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import fetch from 'node-fetch';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const keyPath = path.join(__dirname, '/Key/key.json');
const dataPath = path.join(__dirname, '/data');

const corsOptions = {
  origin: 'https://talemate.cs.vt.edu:3100',
  methods: ['GET', 'POST'],
  credentials: true
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))



let rawKeyData = fs.readFileSync(keyPath); 
let keyData = JSON.parse(rawKeyData);
const JWT_SECRET = keyData.jwt_key;
const GOOGLE_API_KEY = keyData.key; 


const User = mongoose.model("UserInfo");
const UserTouchDetails = mongoose.model("TouchDetails");
const UserTrainingTouchDetails = mongoose.model("TrainingTouchDetails");
const UserPracticeTouchDetails = mongoose.model("PracticeTouchDetails");

app.post("/register", async (req, res) => {
    const { name } = req.body;
  
    try {
      await User.create({
        uname: name,
        answers: {
          baselineTrainingAnswers: null,
          TouchTrainingAnswers: null,
          animationTrainingAnswers: null,
          touchCategoryAnswers: null,
          animationCategoryAnswers: null,
          baselineCategoryAnswers: null,
        },
      });

      console.log("user:", User.uname)
      const token = jwt.sign({name: name}, JWT_SECRET,{
        expiresIn: 86400,
      });
      res.send({ status: "ok", data: token });

    } catch (error) {
      res.send({ status: "error" });
    }
  });


  app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
      const user = jwt.verify(token, JWT_SECRET, (err, res) => {
        if (err) {
          return err;
        }
        return res;
      });

      if (user == "TokenExpiredError: jwt expired") {
        return res.send({ status: "error", data: "token expired" });
      }
  
      const username = user.name;
      const data = await User.findOne({ uname: username });
    
      if (data) {
        res.send({ status: "ok", data: data });
      } else {
        res.send({ status: "error", data: "User not found" });
      }
    } catch (error) {
      console.error("Error :", error);
     }
  });


  // app.post("/update-answer/:questionNumber", async (req, res) => {
  //   const { questionNumber } = req.params;
  //   const { token, newAnswer } = req.body;
  //   const correctAnswers = ["greenTray","purpleTray","greenTray","purpleTray"];
  //   let score = 0;
  
  //   try {
  //     const user = jwt.verify(token, JWT_SECRET);
  //     const username = user.name;

  //     if (newAnswer === correctAnswers[questionNumber]) {
  //       score = 1;
  //     }else{
  //       score = 0;
  //     }

  //     const updatedUser = await User.findOneAndUpdate(
  //       { uname :username },
  //       { [`answer${questionNumber}`]: score },
  //     );
  
  //     res.json(updatedUser);
  //   } catch (error) {
  //     res.status(500).json({ error: "Error updating answer." });
  //   }
  // });

  app.post('/submit-answers', async (req, res) => {
    try{
      const answers = req.body;
      const token = req.headers.authorization.split('Bearer ')[1];

      const user = jwt.verify(token, JWT_SECRET);
      const username = user.name;

      const updatedUser = await User.findOneAndUpdate(
        { uname :username },
        { answers: answers}
      );

      res.json(updatedUser);

    }catch (error) {
      res.status(500).json({ error: "Error saving answer." });
    }
  });


  app.post('/save/Touch/Data', async (req, res) => {
    const { touchData, category, pageNumber } = req.body;

    try {
      await UserTouchDetails.create({
        touchData: touchData,
        category: category,
        pageNumber: pageNumber,
      });

      console.log('Touch data saved to the database.');
      res.status(200).json({ status: 'ok', message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error saving training touch data:', error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  });


  app.post('/save/Training/TouchData', async (req, res) => {
    const { touchData, category, pageNumber } = req.body;

    try {
      await UserTrainingTouchDetails.create({
        touchData: touchData,
        category: category,
        pageNumber: pageNumber,
      });

      console.log('Training touch data saved to the database.');
      res.status(200).json({ status: 'ok', message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error saving training touch data:', error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  });

  app.post('/save/Practice/TouchData', async (req, res) => {
    const { touchData, category, pageNumber } = req.body;

    try {
      await UserPracticeTouchDetails.create({
        touchData: touchData,
        category: category,
        pageNumber: pageNumber,
      });

      console.log('Practice touch data saved to the database.');
      res.status(200).json({ status: 'ok', message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error saving training touch data:', error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  });



  app.post('/speech/synthesize', async (req, res) => {
    try {
      const { text} = req.body;
      
      const  voice = {languageCode: 'en-US', name :'en-US-Neural2-G' };
      const request = {
          input: { text: text},
          voice: voice,
          audioConfig: { audioEncoding: 'MP3' },
        };

      const response = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize?key=' + GOOGLE_API_KEY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

      const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Server Error in Google Text-to-Speech:', error);
        res.status(500).json({ message: error.toString() });
    }
});
  
  



const PORT = 8000;

connectToDb()
  .then(() => {
    console.log("Successfully Connected to DB");

    // app.listen(PORT, () => {
    //   console.log("Server listening on port " + PORT);
    // });
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error);
  });

const httpsOptions = {
    key: fs.readFileSync('/home/sangwonlee/CountingApp/cert/key3.pem'),
    cert: fs.readFileSync('/home/sangwonlee/CountingApp/cert/talemate.cs.vt.edu.crt')
};

createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`Server started on https://talemate.cs.vt.edu:${PORT}`);
});

