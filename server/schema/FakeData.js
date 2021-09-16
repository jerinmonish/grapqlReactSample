const UserList = [
  {
    id: 1,
    name: "John",
    username:"john",
    age:20,
    nationality: "CANADA",
    friends: [
      {
        id: 2,
        name: "Jane",
        username: "jane",
        age: 19,
        nationality: "INDIA"
      },
      {
        id: 4,
        name: "Doe",
        username: "Dev",
        age: 22,
        nationality: "USA",
      }
    ]
  },
  {
    id: 3,
    name: "Jerin",
    username: "jerin",
    age: 26,
    nationality: "CHINA",
    friends: [
      {
        id: 4,
        name: "Doe",
        username: "Dev",
        age: 22,
        nationality: "USA",
      }
    ]
  }
];

const MovieList = [
  {
    id: 1,
    name: "Avengers Endgame",
    yearOfPub: 2019,
    isInTheaters: true
  },
  {
    id: 2,
    name: "Red",
    yearOfPub: 2000,
    isInTheaters: true
  },
  {
    id: 4,
    name: "Jilla",
    yearOfPub: 2016,
    isInTheaters: false
  },
  {
    id: 5,
    name: "Robot",
    yearOfPub: 2012,
    isInTheaters: true
  }
]

module.exports = { UserList, MovieList };