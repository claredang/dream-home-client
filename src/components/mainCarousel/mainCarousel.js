import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";

const MainCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const newIndex = (activeIndex + 1) % images.length;
  //     setActiveIndex(newIndex);
  //   }, 4000); // Change images every 5 seconds

  //   return () => clearInterval(intervalId); // Clear interval on component unmount
  // }, [activeIndex, images]);

  return (
    <Carousel activeIndex={activeIndex} onSelect={handleSelect} interval={null}>
      {!images || images.length === 0 ? (
        <p>No images to display</p>
      ) : (
        images.map((image, index) => (
          <Carousel.Item key={index}>
            <div
              className="embed-responsive embed-responsive-1by1"
              style={{ position: "relative" }}
            >
              <img
                src={image}
                // src={require(`../../assests/house-style-random/house-style-random_9.jpg`)}
                alt={`Image ${index + 1}`}
                className="embed-responsive-item img-fluid"
                style={{ borderRadius: "4px" }}
              />
            </div>
          </Carousel.Item>
        ))
      )}
    </Carousel>
  );
};

export default MainCarousel;
