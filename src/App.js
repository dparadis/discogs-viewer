import React, { Component } from 'react';
import vinyl from './vinyl.svg';
import axios from 'axios';
import './App.css';
import Album from './album/album';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomAlbum: {}
    };
  }

  componentDidMount() {
    axios.get(`https://api.discogs.com/users/divodp/collection/folders/0/releases`)
      .then(res => {
        const randomAlbum = res.data.releases[0].basic_information;
        console.log(randomAlbum);
        this.setState({ randomAlbum });
      });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={vinyl} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Vinyl Randomizer!</h1>
        </header>
        <p>
          <img src="https://media.giphy.com/media/aCKMaeduKfFXG/giphy.gif"></img>
        </p>
        <span>Here's a random album!</span>
        <Album album={this.state.randomAlbum}/>
        <p>
          <button>Get a new suggestion</button>
        </p>
      </div>
    );
  }
}