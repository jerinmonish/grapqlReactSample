const { UserList, MovieList } = require('./FakeData');
const _ = require("lodash");
const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const uid = args.id;
      const user = _.find(UserList, { id: Number(uid) });
      return user;
    },
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name });
      return movie;
    }
  },

  User:{
    favoriteMovies: () => {
      return _.filter(
        MovieList,
        (movie) => 
        movie.yearOfPub >= 2010 && movie.yearOfPub <=2020
      );
    }
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length-1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
      console.log(user);
    },

    updateUsername: (parent, args) => {
      const { id, newUserName} = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        console.log(user.id,id);
        if (Number(user.id) === Number(id)) {
          user.username = newUserName;
          userUpdated = user;
        }
      });
      return userUpdated;
    },

    deleteUser: (parent,args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    }
  }
}

module.exports = { resolvers };