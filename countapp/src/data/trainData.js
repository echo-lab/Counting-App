const trainData = {
  pages: [
    {
      message:["Do you know who this is? That’s right! It’s Cookie Monster! What color is Cookie Monster? Blue! And here is Cookie Monster’s blue tray."],
      img: require("../assests/train1.png"),
      className: "blueTray",
    },
    {
      message:["He has some cookies. Some cookies have chocolate chips on them. Some are plain. Some are big. And some are small."],
      img: require("../assests/train2.png"),
      className: "blueTray",
    },{
      message:["And this is Big Bird and his trays. What’s the color of the left tray? Green! And what’s the color of the right tray? Purple! Great job!"],
      img: require("../assests/train3.png"),
      className: "blueTray",
    },
    {
      message:["Now, you might not know this but Big Bird is a HUGE copycat and always wants to copy Cookie Monster. When Cookie Monster was looking for a snack, Big Bird saw Cookie Monster pick chocolate chip cookies."],
      img: require("../assests/train4.png"),
      className: "backgroundPic",
    },
    {
      message:["So then when Big Bird chose his snack, he copied Cookie Monster and also picked chocolate chip cookies."],
      img: require("../assests/train5.png"),
      className: "backgroundPic",
    },
    {
      message:["Now look! Cookie Monster has a chocolate cookie. Which of these trays also has a chocolate cookie? Green? or purple?"],
      cookies: [
        {
          id: 1,
          img: require("../assests/chocoChip.png"),
          top: "140px",
          left: "40px",
        },
      ],
      greenTray: [
        {
          biscuits: [
            {
              id: 1,
              img: require("../assests/m&m.png"),
              top: "140px",
              left: "80px",
            },
          ],
        },
      ],
      purpleTray: [
        {
          biscuits: [
            {
              id: 1,
              img: require("../assests/tornadoCookie.png"),
              top: "140px",
              left: "90px",
            },
          ],
        },
      ],
    },
    {
      message:["Remember, Big Bird always puts his cookies in one of these trays, either the green or the purple tray."],
      cookies: [
      ],
      greenTray: [
        {
          biscuits: [
          ],
        },
      ],
      purpleTray: [
        {
          biscuits: [
          ],
        },
      ],
    },
    {
      message:[" Cookie Monster has 2 cookies. Can Big Bird also have 2 cookies? Which tray has 2 cookies? Green? or purple?"],
      cookies: [
        {
          id: 1,
          img: require("../assests/seashellCookie.png"),
          top: "50px",
          left: "20px",
        },
        {
          id: 2,
          img: require("../assests/seashellCookie.png"),
          top: "200px",
          left: "120px",
        },
      ],
      greenTray: [
        {
          biscuits: [
            {
              id: 1,
              img: require("../assests/multiCookie.png"),
              top: "140px",
              left: "80px",
            },
            {
              id: 2,
              img: require("../assests/multiCookie.png"),
              top: "220px",
              left: "160px",
            },
          ],
        },
      ],
      purpleTray: [
        {
          biscuits: [
            {
              id: 1,
              img: require("../assests/multiCookie.png"),
              top: "220px",
              left: "160px",
            },
          ],
        },
      ],
    },
    {
      message:["Cookie Monster has 1 cookie. Can Big Bird also have 1 cookie? Which tray has 1 cookie? Green? or purple?"],
      cookies: [
        {
          id: 1,
          img: require("../assests/seashellCookie.png"),
          top: "170px",
          left: "90px",
        },
      ],
      greenTray: [
        {
          biscuits: [
            {
              id: 1,
              img: require("../assests/multiCookie.png"),
              top: "140px",
              left: "80px",
            },
            {
              id: 2,
              img: require("../assests/multiCookie.png"),
              top: "80px",
              left: "160px",
            },
          ],
        },
      ],
      purpleTray: [
        {
          biscuits: [
            {
              id: 1,
              img: require("../assests/multiCookie.png"),
              top: "80px",
              left: "160px",
            },
          ],
        },
      ],
    },
    {
      message:[" Cookie Monster has 10 cookies. Can Big Bird also have 10 cookies? Which tray has 10 cookies? Green? or purple?"],
      cookies: [
        {
          id: 1,
          img: require("../assests/Cookie.png"),
          top: "25px",
          left: "40px",
        },
        {
          id: 2,
          img: require("../assests/Cookie.png"),
          top: "20px",
          left: "150px",
        },
        {
          id: 3,
          img: require("../assests/Cookie.png"),
          top: "90px",
          left: "80px",
        },
        {
          id: 4,
          img: require("../assests/Cookie.png"),
          top: "80px",
          left: "170px",
        },
        {
          id: 5,
          img: require("../assests/Cookie.png"),
          top: "140px",
          left: "20px",
        },
        {
          id: 6,
          img: require("../assests/Cookie.png"),
          top: "140px",
          left: "160px",
        },
        {
          id: 7,
          img: require("../assests/Cookie.png"),
          top: "195px",
          left: "60px",
        },
        {
          id: 8,
          img: require("../assests/Cookie.png"),
          top: "210px",
          left: "180px",
        },
        {
          id: 9,
          img: require("../assests/Cookie.png"),
          top: "260px",
          left: "40px",
        },
        {
          id: 10,
          img: require("../assests/Cookie.png"),
          top: "290px",
          left: "150px",
        },
      ],
      greenTray: [
        {
          biscuits: [
            {
              id: 1,
              img: require("../assests/rasinCookie.png"),
              top: "10px",
              left: "160px",
            },
            {
              id: 2,
              img: require("../assests/rasinCookie.png"),
              top: "30px",
              left: "40px",
            },
            {
              id: 3,
              img: require("../assests/rasinCookie.png"),
              top: "70px",
              left: "120px",
            },
            {
              id: 4,
              img: require("../assests/rasinCookie.png"),
              top: "100px",
              left: "200px",
            },
            {
              id: 5,
              img: require("../assests/rasinCookie.png"),
              top: "125px",
              left: "50px",
            },
            {
              id: 6,
              img: require("../assests/rasinCookie.png"),
              top: "160px",
              left: "160px",
            },
            {
              id: 7,
              img: require("../assests/rasinCookie.png"),
              top: "190px",
              left: "80px",
            },
            {
              id: 8,
              img: require("../assests/rasinCookie.png"),
              top: "220px",
              left: "180px",
            },
            {
              id: 9,
              img: require("../assests/rasinCookie.png"),
              top: "270px",
              left: "140px",
            },
            {
              id: 10,
              img: require("../assests/rasinCookie.png"),
              top: "290px",
              left: "50px",
            },
          ],
        },
      ],
      purpleTray: [
        {
          biscuits: [
            {
              id: 1,
              img: require("../assests/rasinCookie.png"),
              top: "25px",
              left: "50px",
            },
            {
              id: 2,
              img: require("../assests/rasinCookie.png"),
              top: "90px",
              left: "150px",
            },
            {
              id: 3,
              img: require("../assests/rasinCookie.png"),
              top: "160px",
              left: "50px",
            },
            {
              id: 4,
              img: require("../assests/rasinCookie.png"),
              top: "200px",
              left: "150px",
            },
            {
              id: 5,
              img: require("../assests/rasinCookie.png"),
              top: "260px",
              left: "50px",
            },
          ],
        },
      ],
    },
    {
      message:[" Cookie Monster has 5 cookies. Can Big Bird also have 5 cookies? Which tray has 5 cookies? Green? or purple?"],
      cookies: [
        {
          id: 1,
          img: require("../assests/creamCookie.png"),
          top: "25px",
          left: "40px",
        },
        {
          id: 2,
          img: require("../assests/creamCookie.png"),
          top: "70px",
          left: "150px",
        },
        {
          id: 3,
          img: require("../assests/creamCookie.png"),
          top: "130px",
          left: "50px",
        },
        {
          id: 4,
          img: require("../assests/creamCookie.png"),
          top: "180px",
          left: "170px",
        },
        {
          id: 5,
          img: require("../assests/creamCookie.png"),
          top: "250px",
          left: "70px",
        },
      ],
      greenTray: [
        {
          biscuits: [
            {
              id: 1,
              img: require("../assests/heartCookie.png"),
              top: "10px",
              left: "100px",
            },
            {
              id: 2,
              img: require("../assests/heartCookie.png"),
              top: "50px",
              left: "20px",
            },
            {
              id: 3,
              img: require("../assests/heartCookie.png"),
              top: "40px",
              left: "190px",
            },
            {
              id: 4,
              img: require("../assests/heartCookie.png"),
              top: "90px",
              left: "100px",
            },
            {
              id: 5,
              img: require("../assests/heartCookie.png"),
              top: "140px",
              left: "20px",
            },
            {
              id: 6,
              img: require("../assests/heartCookie.png"),
              top: "140px",
              left: "160px",
            },
            {
              id: 7,
              img: require("../assests/heartCookie.png"),
              top: "195px",
              left: "60px",
            },
            {
              id: 8,
              img: require("../assests/heartCookie.png"),
              top: "200px",
              left: "180px",
            },
            {
              id: 9,
              img: require("../assests/heartCookie.png"),
              top: "260px",
              left: "40px",
            },
            {
              id: 10,
              img: require("../assests/heartCookie.png"),
              top: "290px",
              left: "150px",
            },
          ],
        },
      ],
      purpleTray: [
        {
          biscuits: [
            {
              id: 1,
              img: require("../assests/heartCookie.png"),
              top: "25px",
              left: "150px",
            },
            {
              id: 2,
              img: require("../assests/heartCookie.png"),
              top: "90px",
              left: "50px",
            },
            {
              id: 3,
              img: require("../assests/heartCookie.png"),
              top: "150px",
              left: "140px",
            },
            {
              id: 4,
              img: require("../assests/heartCookie.png"),
              top: "200px",
              left: "50px",
            },
            {
              id: 5,
              img: require("../assests/heartCookie.png"),
              top: "260px",
              left: "150px",
            },
          ],
        },
      ],
    },
    {
      message:[" Cookie Monster has 5 cookies. Can Big Bird also have 5 cookies? Which tray has 5 cookies? Green? or purple?"],
      cookies: [
        {
          id: 1,
          img: require("../assests/PinkCookie.png"),
          top: "25px",
          left: "40px",
        },
        {
          id: 2,
          img: require("../assests/PinkCookie.png"),
          top: "70px",
          left: "150px",
        },
        {
          id: 3,
          img: require("../assests/PinkCookie.png"),
          top: "140px",
          left: "40px",
        },
        {
          id: 4,
          img: require("../assests/PinkCookie.png"),
          top: "180px",
          left: "170px",
        },
        {
          id: 5,
          img: require("../assests/PinkCookie.png"),
          top: "270px",
          left: "90px",
        },
      ],
      greenTray: [
        {
          biscuits: [
            {
              id: 1,
              img: require("../assests/oreo.png"),
              top: "25px",
              left: "90px",
            },
            {
              id: 2,
              img: require("../assests/oreo.png"),
              top: "140px",
              left: "50px",
            },
            {
              id: 3,
              img: require("../assests/oreo.png"),
              top: "130px",
              left: "160px",
            },
            {
              id: 4,
              img: require("../assests/oreo.png"),
              top: "220px",
              left: "170px",
            },
            {
              id: 5,
              img: require("../assests/oreo.png"),
              top: "260px",
              left: "50px",
            },
          ],
        },
      ],
      purpleTray: [
        {
          biscuits: [
            {
              id: 1,
              img: require("../assests/oreo.png"),
              top: "30px",
              left: "40px",
            },
            {
              id: 2,
              img: require("../assests/oreo.png"),
              top: "10px",
              left: "150px",
            },
            {
              id: 3,
              img: require("../assests/oreo.png"),
              top: "90px",
              left: "40px",
            },
            {
              id: 4,
              img: require("../assests/oreo.png"),
              top: "70px",
              left: "150px",
            },
            {
              id: 5,
              img: require("../assests/oreo.png"),
              top: "150px",
              left: "40px",
            },
            {
              id: 6,
              img: require("../assests/oreo.png"),
              top: "140px",
              left: "160px",
            },
            {
              id: 7,
              img: require("../assests/oreo.png"),
              top: "210px",
              left: "80px",
            },
            {
              id: 8,
              img: require("../assests/oreo.png"),
              top: "230px",
              left: "180px",
            },
            {
              id: 9,
              img: require("../assests/oreo.png"),
              top: "260px",
              left: "40px",
            },
            {
              id: 10,
              img: require("../assests/oreo.png"),
              top: "290px",
              left: "150px",
            },
          ],
        },
      ],
    },
    {
      message:[" Cookie Monster has 10 cookies. Can Big Bird also have 10 cookies? Which tray has 10 cookies? Green? or purple?"],
      cookies: [
        {
          id: 1,
          img: require("../assests/yellowcookie.png"),
          top: "30px",
          left: "10px",
        },
        {
          id: 2,
          img: require("../assests/yellowcookie.png"),
          top: "10px",
          left: "180px",
        },
        {
          id: 3,
          img: require("../assests/yellowcookie.png"),
          top: "90px",
          left: "90px",
        },
        {
          id: 4,
          img: require("../assests/yellowcookie.png"),
          top: "120px",
          left: "170px",
        },
        {
          id: 5,
          img: require("../assests/yellowcookie.png"),
          top: "150px",
          left: "20px",
        },
        {
          id: 6,
          img: require("../assests/yellowcookie.png"),
          top: "195px",
          left: "95px",
        },
        {
          id: 7,
          img: require("../assests/yellowcookie.png"),
          top: "200px",
          left: "180px",
        },
        {
          id: 8,
          img: require("../assests/yellowcookie.png"),
          top: "280px",
          left: "20px",
        },
        {
          id: 9,
          img: require("../assests/yellowcookie.png"),
          top: "320px",
          left: "90px",
        },
        {
          id: 10,
          img: require("../assests/yellowcookie.png"),
          top: "290px",
          left: "170px",
        },
      ],
      greenTray: [
        {
          biscuits: [
            {
              id: 1,
              img: require("../assests/donut.png"),
              top: "25px",
              left: "170px",
            },
            {
              id: 2,
              img: require("../assests/donut.png"),
              top: "60px",
              left: "90px",
            },
            {
              id: 3,
              img: require("../assests/donut.png"),
              top: "120px",
              left: "50px",
            },
            {
              id: 4,
              img: require("../assests/donut.png"),
              top: "160px",
              left: "170px",
            },
            {
              id: 5,
              img: require("../assests/donut.png"),
              top: "260px",
              left: "70px",
            },
          ],
        },
      ],
      purpleTray: [
        {
          biscuits: [
            {
              id: 1,
              img: require("../assests/donut.png"),
              top: "10px",
              left: "60px",
            },
            {
              id: 2,
              img: require("../assests/donut.png"),
              top: "20px",
              left: "170px",
            },
            {
              id: 3,
              img: require("../assests/donut.png"),
              top: "90px",
              left: "40px",
            },
            {
              id: 4,
              img: require("../assests/donut.png"),
              top: "80px",
              left: "140px",
            },
            {
              id: 5,
              img: require("../assests/donut.png"),
              top: "160px",
              left: "50px",
            },
            {
              id: 6,
              img: require("../assests/donut.png"),
              top: "140px",
              left: "150px",
            },
            {
              id: 7,
              img: require("../assests/donut.png"),
              top: "200px",
              left: "140px",
            },
            {
              id: 8,
              img: require("../assests/donut.png"),
              top: "270px",
              left: "40px",
            },
            {
              id: 9,
              img: require("../assests/donut.png"),
              top: "250px",
              left: "190px",
            },
            {
              id: 10,
              img: require("../assests/donut.png"),
              top: "300px",
              left: "120px",
            },
          ],
        },
      ],
    },
  ],
};

export default trainData;
