import React, { Component } from "react";
import { Fade } from "react-reveal";
import PhotoAlbum from "react-photo-album";
import { Redirect } from "react-router-dom";
import "./Explore.css";
import Button from "../../components/button/Button";
import { Card, CardGroup, Alert, CardDeck, Form, Col } from "react-bootstrap";
import MainCarousel from "../../components/mainCarousel/mainCarousel";
import ExploreCard from "../../components/exploreCard/exploreCard";
import axios from "axios";
import FormInput from "../../components/formInput/formInput";
import Header from "../../components/header/Header";

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
      const response = await fetch("http://localhost:8080/explore");
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
      <div>
        <Header theme={theme} />
        <div className="container-fluid container py-3 mt-2">
          <h2 className="h3">
            What guests are saying about homes in the United States
          </h2>
          <FormInput />
          <div className="row mt-4">
            {this.state.data.map((item, index) => (
              <ExploreCard
                key={index}
                title={item["title"]}
                interiorStyle={item["interior_style"]}
                price={item["price"]}
                rating={item["rating"]}
                location={item["location"]}
                imageUrl={item["image_url"]}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Explore;
