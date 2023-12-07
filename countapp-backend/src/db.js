import mongoose from "mongoose";
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const keyPath = path.join(__dirname, '/Key/key.json');

let rawKeyData = fs.readFileSync(keyPath); 
let keyData = JSON.parse(rawKeyData);

const uname = keyData.mongo_username;
const pw = keyData.mongo_pw;

const mongoUrl = `mongodb+srv://${uname}:${pw}@cluster0.oypxwnq.mongodb.net/?retryWrites=true&w=majority`;

async function connectToDb(cb){
    mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
      })
        .then(() => {
          console.log('Connected to MongoDB');
        })
        .catch((err) => {
          console.error('Error connecting to MongoDB:', err);
        });
}


export{
    connectToDb,
};