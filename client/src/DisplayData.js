import React, { useState } from "react";
import { useQuery, useLazyQuery ,gql, useMutation } from "@apollo/client";
const QUERY_ALL_USERS = gql`
  query getAllUsers{
    users {
      id,
      name,
      age,
      username,
      nationality,
      friends {
        name,
        age
      }
    }
  }
`

const QUERY_ALL_MOVIES= gql`
  query getAllMovies{
      movies {
        id,
        name,
        yearOfPub,
        isInTheaters
      }
  }
`

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!){
    movie(name: $name) {
      id,
      name,
      yearOfPub
    }
  }
`

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!){
    createUser(input: $input) {
      name,
      username,
      age,
      nationality
    }
  }
`

function DisplayData(){
  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData, loading: movieLoading, error: movieError } = useQuery(QUERY_ALL_MOVIES);
  const [movieSearched, setMovieSearched] = useState("");
  const [fetchMovie, { data: movieSearchData, error: movieSearchError }] = useLazyQuery(GET_MOVIE_BY_NAME)

  const [createUser] = useMutation(CREATE_USER_MUTATION);
  
  //Create User states
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");

  if(loading){
    <h1>Loading ...</h1>
  }
  if(error){
    console.log(error);
  }
  if(data){
    console.log(data);
  }

  if (movieSearchError){
    console.log(movieSearchError);
  }
  return (
    <div>
      <div>
        Name: <input type="text" placeholder="Name" onChange={(event) => { setName(event.target.value) }}/>
        Username: <input type="text" placeholder="Username" onChange={(event) => { setUsername(event.target.value) }}/>
        Age: <input type="text" placeholder="Age" onChange={(event) => { setAge(event.target.value) }}/>
        Nationality: <input type="text" placeholder="Nationality" onChange={(event) => { setNationality(event.target.value.toUpperCase()) }}/>
        <button 
          onClick={ () => { 
            createUser({
              variables: { input: { name, username, age:Number(age), nationality }} 
            });
            refetch();
          }}
        >Create User</button>
      </div>
      {data && data.users.map((user, idx) => {
        return (
          <div id={idx}>
            <h1>Name: {user.name}</h1>
            <h1>Username: {user.username}</h1>
            <h1>Age: {user.age}</h1>
            <h1>Nationality: {user.nationality}</h1>
          </div>
        );
      })}

      {movieData && movieData.movies.map((movies, mvx)=> {
        return (
          <div>
            <h1><i>Movie Name:{movies.name}</i></h1>
          </div>
        )
      })}
      
      <div>
        <input type="text" placeholder="Red ..." onChange={(event) => { setMovieSearched(event.target.value) }}/>
        <button 
          onClick={() => { 
            fetchMovie({
              variables: {
                name: movieSearched
              }
            }) 
          }}
        >Search</button>
        <div>
          { movieSearchData && (
            <div>
              {" "}
              <h1>Moviename: {movieSearchData.movie.name}</h1>{""}
              <h1>Year of Release: {movieSearchData.movie.yearOfPub}</h1>{""}
            </div>
          )}
          { movieSearchError && <h1>No Such Movies</h1>}
        </div>
      </div>
    </div>
  )
}

export default DisplayData;