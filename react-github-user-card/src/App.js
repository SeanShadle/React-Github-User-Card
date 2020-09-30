import React from "react";
import "./App.css";
import axios from "axios";
import styled from 'styled-components'

class App extends React.Component {
  state = {
    users: [],
  };

  buildArray = async () => {
    const res = await axios.get(`https://api.github.com/users/SeanShadle`);
    const response = await axios.get(res.data.followers_url);
    const results = await Promise.all(
      response.data.map(follower => axios.get(follower.url)));
      console.log("Results:", results)
    const resultData = results.map(result => result.data);
    this.setState({ users: [...this.state.users, res.data, ...resultData] });
  };

  componentDidMount() {
    this.buildArray(this.state.name);
  }

  render() {
    console.log(this.state.users)
    return (
      <StyledDiv>
        <h1>GitHub Users</h1>
        <div className="followerContainer">
          {this.state.users.map((user) => {
              return (
                <StyledCard>
                  <StyledImage src={user.avatar_url} />
                  <h2>Name: </h2><p>{user.name}</p>
                  <h3>Username: </h3><p>{user.login}</p>
                  <h3>Bio: </h3><p>{user.bio ? user.bio : 'No bio listed'}</p>
                </StyledCard>
              );
          })}
        </div>
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledCard = styled.div`
  text-align: center;
  flex-direction: row;
  background-color: #f7f7f7;
  border-radius: 15px;
  width: 30vw;
  padding: 2vh 0vh;
  margin-bottom: 2vh;
`

const StyledImage = styled.img`
  border-radius: 10px;
  width: 20vw;
`


export default App;
