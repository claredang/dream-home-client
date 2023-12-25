import React, { Component } from "react";
import "./Explore.css";
import ExploreCard from "../../components/exploreCard/exploreCard";
import axios from "axios";
import Header from "../../components/header/Header";
import TopButton from "../../components/topButton/TopButton";
import Footer from "../../components/footer/Footer";
import text from "../../shared/content";
import Emoji from "../../shared/emoji";
import { convertToHyphen, styleToColor } from "../../shared/utils";
import { removeLocation } from "../../shared/gpt";

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedCategory: "all", // Default to show all cards
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/explore`);

      const result = await response.json();
      this.setState({ data: result });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  handleCategoryChange = (category) => {
    this.setState({ selectedCategory: convertToHyphen(category) });
  };

  getCategoryButtonClass(category) {
    const baseClass = "badge badge-pill px-4 py-2 mx-2 my-2";
    return `${baseClass} ${
      this.state.selectedCategory === convertToHyphen(category)
        ? styleToColor(category)
        : "badge-light"
    }`;
  }

  render() {
    const theme = this.props.theme;
    const filteredData =
      this.state.selectedCategory === "all"
        ? this.state.data
        : this.state.data.filter(
            (item) =>
              convertToHyphen(item["interior_style"]) ===
              this.state.selectedCategory
          );

    const styleCategory = [
      ...new Set(this.state.data.map((item) => item["interior_style"])),
    ];

    return (
      <div>
        <Header theme={theme} />
        <div className="container-fluid container py-3 px-3">
          <p className="explore-title mb-4">
            {text.explore.explore_title}{" "}
            <span>
              {" "}
              <Emoji symbol="✨" label="sparkles" />
            </span>
          </p>
          {/* <FormInput /> */}
          <div className="category-buttons">
            <button
              className={this.getCategoryButtonClass("all")}
              onClick={() => this.handleCategoryChange("all")}
            >
              All
            </button>
            {styleCategory.map((category, index) => (
              <button
                key={index}
                className={this.getCategoryButtonClass(category)}
                onClick={() => this.handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="row mt-4">
            {filteredData.map((item, index) => (
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
        <Footer theme={this.props.theme} onToggle={this.props.onToggle} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default Explore;
