import { BASE_URL } from '../helpers/constants.js';

export async function saveAnswers() {
    const baselineTrainingAnswers = localStorage.getItem('baselineTrainingAnswers');
    const TouchTrainingAnswers = localStorage.getItem('TouchTrainingAnswers');
    const animationTrainingAnswers = localStorage.getItem('animationTrainingAnswers');
    const touchCategoryAnswers = localStorage.getItem('touchCategoryAnswers');
    const animationCategoryAnswers = localStorage.getItem('animationCategoryAnswers');
    const baselineCategoryAnswers = localStorage.getItem('baselineCategoryAnswers');
    const token = window.localStorage.getItem("token");
    try {
    const answerData = {
        baselineTrainingAnswers: baselineTrainingAnswers,
        TouchTrainingAnswers: TouchTrainingAnswers,
        animationTrainingAnswers: animationTrainingAnswers,
        touchCategoryAnswers: touchCategoryAnswers,
        animationCategoryAnswers: animationCategoryAnswers,
        baselineCategoryAnswers: baselineCategoryAnswers,
    };

    const response = await fetch(`${BASE_URL}/submit-answers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(answerData),
    });

    if (!response.ok) {
        throw new Error('Failed to send answers to the backend');
      }
  
      const data = await response.json();
      console.log('Answers sent successfully:', data);
  } catch (error) {
    console.error('Error in Storing Answers:', error);
  }
  }
