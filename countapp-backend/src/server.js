import {connectToDb} from './db.js';
import express from 'express';
import './data/userDetails.js';
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
  origin: 'https://talemate.cs.vt.edu:3000',
  methods: 'POST',
  credentials: true
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


const JWT_SECRET = "wjergiurh2o$3hrorir804623]4801[1314hkjtgo24o823801";
let rawKeyData = fs.readFileSync(keyPath); 
let keyData = JSON.parse(rawKeyData);
const GOOGLE_API_KEY = keyData.key; 


const User = mongoose.model("UserInfo");

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


  app.post('/saveTrainingTouchData', (req, res) => {
    try {
      console.log('Received request with body:', req.body);
      const { touchData } = req.body; 
      const {typeOfTraining } = req.body;
      console.log('Parsed touch data:', typeOfTraining);
      const dataToWrite = `${typeOfTraining}: ${JSON.stringify(touchData)}`;
      fs.writeFileSync(`${dataPath}/TrainingTouchData.txt`, dataToWrite);
  
      res.status(200).send('Touch data saved successfully.');
    } catch (error) {
      console.error('Error saving touch data:', error);
      res.status(500).send('Error saving touch data.');
    }
  });

  app.post('/save/Game/Touch/Baseline/Data', (req, res) => {
    try {
      console.log('Received request with body:', req.body);
      const { touchData } = req.body; 
      console.log('Parsed touch data:', touchData);
  
      fs.writeFileSync(`${dataPath}/BaselineGameData.txt`, JSON.stringify(touchData));
  
      res.status(200).send('Touch data saved successfully.');
    } catch (error) {
      console.error('Error saving touch data:', error);
      res.status(500).send('Error saving touch data.');
    }
  });

  app.post('/save/Game/Touch/Data', (req, res) => {
    try {
      console.log('Received request with body:', req.body);
      const { touchData } = req.body; 
      console.log('Parsed touch data:', touchData);
  
      fs.writeFileSync(`${dataPath}/TouchGameData.txt`, JSON.stringify(touchData));
  
      res.status(200).send('Touch data saved successfully.');
    } catch (error) {
      console.error('Error saving touch data:', error);
      res.status(500).send('Error saving touch data.');
    }
  });

  app.post('/save/Game/Touch/Animation/Data', (req, res) => {
    try {
      console.log('Received request with body:', req.body);
      const { touchData } = req.body; 
      console.log('Parsed touch data:', touchData);
  
      fs.writeFileSync(`${dataPath}/AnimationGameData.txt`, JSON.stringify(touchData));
  
      res.status(200).send('Touch data saved successfully.');
    } catch (error) {
      console.error('Error saving touch data:', error);
      res.status(500).send('Error saving touch data.');
    }
  });

  app.post('/savePracticeTouchData', (req, res) => {
    try {
      console.log('Received request with body:', req.body);
      const { touchData } = req.body; 
      console.log('Parsed touch data:', touchData);
  
      fs.writeFileSync(`${dataPath}/PracticeTouchData.txt`, JSON.stringify(touchData));
  
      res.status(200).send('Touch data saved successfully.');
    } catch (error) {
      console.error('Error saving touch data:', error);
      res.status(500).send('Error saving touch data.');
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
    key: fs.readFileSync('/home/sangwonlee/TaleMate/cert/key3.pem'),
    cert: fs.readFileSync('/home/sangwonlee/TaleMate/cert/talemate.cs.vt.edu.crt')
};

createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`Server started on https://talemate.cs.vt.edu:${PORT}`);
});

