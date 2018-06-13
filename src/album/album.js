import React, { Component } from 'react';

export default class Album extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    if (this.props.album.artists) {
      return (
        <div>
          <span className="artist"><strong>
           { this.props.album.artists && 
             this.props.album.artists.map(artist => artist.name).join(', ') 
           } / 
          </strong></span>
          <span className="title"> {this.props.album.title}</span>
        </div>
      );
    } else {
      return '';
    }
  }
}