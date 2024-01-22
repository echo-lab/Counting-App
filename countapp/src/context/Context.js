import React, { createContext, useContext } from 'react';
import animationData from '../data/animationData.js';
import baseData from  "../data/baseData.js";
import Data from "../data/data.js";
import practiceData from '../data/practiceData';
import sectionTrainData from "../data/sectionTrainingData.js";
import trainData from  "../data/trainData.js";
import audioFiles from '../data/audioData.js';


const AppDataContext = createContext({
    animationData: animationData,
    baseData: baseData,
    Data: Data,
    sectionTrainData: sectionTrainData,
    trainData: trainData,
    practiceData: practiceData,
    audioData: audioFiles,
});

export const AppDataProvider = ({ children }) => {
  return <AppDataContext.Provider value={{ animationData: animationData, baseData: baseData, Data: Data, sectionTrainData: sectionTrainData, trainData: trainData, practiceData: practiceData, audioData: audioFiles}}>{children}</AppDataContext.Provider>;
};

export const useAppData = () => {
  return useContext(AppDataContext);
};