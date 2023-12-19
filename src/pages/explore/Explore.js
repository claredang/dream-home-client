import React, { Component } from "react";
import { Fade } from "react-reveal";
import PhotoAlbum from "react-photo-album";
import { Redirect } from "react-router-dom";
import "./Explore.css";
import Button from "../../components/button/Button";
import { Card, CardGroup, Alert, CardDeck } from "react-bootstrap";
import MainCarousel from "../../components/mainCarousel/mainCarousel";
import ExploreCard from "../../components/exploreCard/exploreCard";

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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  render() {
    const theme = this.props.theme;
    console.log("data :", this.state.data);

    return (
      <div style={{ backgroundColor: "white" }}>
        <p>Explore page</p>
        <button onClick={this.fetchData}>click here</button>
        <div class="container-fluid container py-3 mt-2">
          <h2 class="h3">
            What guests are saying about homes in the United States
          </h2>
          <button onClick={this.fetchData}>click here</button>
          <div class="row mt-4">
            {this.state.data.map((item, index) => (
              <ExploreCard
                key={index} // Make sure to include a unique key for each element
                title={item["title"]}
                interiorStyle={item["interior_style"]}
                price={item["price"]}
                rating={item["rating"]}
                location={item["location"]}
                // imageUrl={item.images.picture_url}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Explore;
