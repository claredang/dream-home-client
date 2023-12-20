import React, { useState } from "react";
import axios from "axios";

const FormInput = () => {
  // State to track form data
  const [formData, setFormData] = useState({
    title: "",
    interior_style: "",
    location: "",
    price: "",
    rating: "",
    files: [],
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      files: e.target.files || [], // Ensure it's not null
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("interior_style", formData.interior_style);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("rating", formData.rating);

    // Append each file to FormData
    if (formData.files && formData.files.length > 0) {
      for (let i = 0; i < formData.files.length; i++) {
        formDataToSend.append("file", formData.files[i]);
      }
    }

    try {
      // Use Axios to send the data to the server
      const response = await axios.post(
        "http://localhost:8080/upload",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Interior style
        <input
          type="text"
          name="interior_style"
          value={formData.interior_style}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Location
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Price
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Rating
        <input
          type="text"
          name="rating"
          value={formData.rating}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Files:
        <input type="file" name="files" multiple onChange={handleFileChange} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormInput;
