import React, { Component } from 'react';
import vinyl from './vinyl.svg';
import axios from 'axios';
import './App.css';
import Album from './album/album';

const PER_PAGE = 50; // Default value on Discogs

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleRandomizeClick = this.handleRandomizeClick.bind(this);

    this.state = {
      totalAlbumsCount: 0,
      loading: false,
      randomAlbum: {}
    };
  }

  componentDidMount() {
    this.fetchAlbumsCount().then(res => {
      this.setState({ totalAlbumsCount: res.data.pagination.items });
      this.fetchRandomAlbum();
    });
  }

  fetchAlbumsCount() {
    return axios.get(`https://api.discogs.com/users/divodp/collection/folders/0/releases`)
  }

  fetchRandomAlbum() {
    this.setState({loading: true, randomAlbum: {}})
    const min = Math.ceil(1);
    const max = Math.floor(this.state.totalAlbumsCount);
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const page = Math.ceil(randomNumber / PER_PAGE);
    const arrayIndex = (randomNumber % PER_PAGE) - 1;

    axios.get(`https://api.discogs.com/users/divodp/collection/folders/0/releases?page=${page}`)
    .then(res => {
      const randomAlbum = res.data.releases[arrayIndex].basic_information;
      console.log(randomAlbum);
      this.setState({ randomAlbum, loading: false });
    });
  }

  handleRandomizeClick() {
    return this.fetchRandomAlbum();
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
          { this.state.loading ? 
            <p>Loading...</p>
          : this.state.randomAlbum.artists &&
            <p>Here's a random album!</p>
          }
          <Album album={this.state.randomAlbum}></Album>
        <p>
          <button onClick={this.handleRandomizeClick}>Get a new suggestion</button>
        </p>
      </div>
    );
  }
}