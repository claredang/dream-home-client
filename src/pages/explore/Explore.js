import React, { Component } from "react";
import { Fade } from "react-reveal";
import PhotoAlbum from "react-photo-album";
import { Redirect } from "react-router-dom";
import "./Explore.css";

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/explore"); // Assuming your backend is serving the API at this endpoint
      const result = await response.json();
      this.setState({ data: result });
      console.log("result here: ", result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  render() {
    const theme = this.props.theme;

    return (
      <div>
        <p>Explore page</p>
        <button onClick={this.fetchData}>click here</button>
      </div>
    );
  }
}

export default Explore;
