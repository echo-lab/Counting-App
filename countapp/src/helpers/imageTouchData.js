import { BASE_URL } from '../helpers/constants.js';

export const handleInteraction = (event, setTouchData) => {
  const date = new Date().toLocaleDateString();
  const currentTime = new Date();
  const milliseconds = currentTime.getMilliseconds();
  const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}:${milliseconds}`;

  const touchX = event.clientX || (event.touches && event.touches[0].clientX);
  const touchY = event.clientY || (event.touches && event.touches[0].clientY);

  const interaction = {
    x: touchX,
    y: touchY,
    date: date,
    time: formattedTime,
    name:"random "
  };


  if (event.target && event.target.tagName && event.target.tagName.toLowerCase() === 'img') {
    const imageId = event.target.id;
    const imageName = event.target.getAttribute('alt'); 

    interaction.id = imageId;
    interaction.name = imageName;
  }
    setTouchData((prevData) => [...prevData, interaction]);
  
    console.log(`Object: ${interaction.name}, Time: ${interaction.time}`);
  };


  export const handleNextClickBaseline = (touchData) => {
    console.log("touchdata:", touchData)
    fetch(`${BASE_URL}/save/Game/Touch/Baseline/Data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ touchData }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Touch data sent successfully.');
        } else {
          console.error('Failed to send touch data to the backend.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };

  

  export const handleNextClickTouch = (touchData) => {
    console.log("touchdata:", touchData)
    fetch(`${BASE_URL}/save/Game/Touch/Data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ touchData }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Touch data sent successfully.');
        } else {
          console.error('Failed to send touch data to the backend.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };

  export const handleNextClickAnimation = (touchData) => {
    console.log("touchdata:", touchData)
    fetch(`${BASE_URL}/save/Game/Touch/Animation/Data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ touchData }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Touch data sent successfully.');
        } else {
          console.error('Failed to send touch data to the backend.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };

  export const handleNextClickTraining = (touchData, typeOfTraining) => {
    console.log("touchdata:", touchData)
    fetch(`${BASE_URL}/saveTrainingTouchData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ touchData, typeOfTraining }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Touch data sent successfully.');
        } else {
          console.error('Failed to send touch data to the backend.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };

  export const handleNextClickPractice = (touchData) => {
    console.log("touchdata:", touchData)
    fetch(`${BASE_URL}/savePracticeTouchData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ touchData }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Touch data sent successfully.');
        } else {
          console.error('Failed to send touch data to the backend.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };