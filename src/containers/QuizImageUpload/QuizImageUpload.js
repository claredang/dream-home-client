import React, { Component } from "react";
import "./QuizImageUpload.css";
import axios from "axios";
import Header from "../../components/header/Header.js";
import Footer from "../../components/footer/Footer.js";
import TopButton from "../../components/topButton/TopButton.js";
import text from "../../shared/content.js";

class QuizImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      val: "Upload image to predict",
      filename: "No file Uploaded",
      file: null,
      imageUrl: null,
    };
  }

  componentDidMount() {}

  handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", this.state.file);
    console.log(this.state.file, this.state.file.name);
    console.log(process.env.REACT_APP_FLASK_API_URL);

    await axios
      .post(`${process.env.REACT_APP_FLASK_API_URL}/api/upload`, formData)
      .then((res) => {
        console.log(res.data.message, "filename url", res.data.filename);
        this.setState({ val: res.data.message });
      });
    alert("File uploaded successfully");
  };

  handleFileUpload = (event) => {
    const file = event.target.files[0];
    this.setState({ filename: file.name, file: file });
  };

  render() {
    const theme = this.props.theme;
    return (
      <div class="main">
        <Header theme={theme} />
        <h1 className=" mb-4 text-3xl font-extrabold dark:text-indigo-800 md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-600 from-blue-900">
            Unleash Your Imagination
          </span>
          <br /> Detect Your Style
        </h1>
        <p className="text-lg font-normal text-white lg:text-xl">
          Upload the image file to detect.
        </p>
        <form onSubmit={this.handleSubmit}>
          <div className="flex w-full items-start justify-center bg-grey-lighter mb-5 mt-[5rem] ">
            <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-blue-600">
              <svg
                className="w-8 h-8"
                fill="blue"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">
                Select a file
              </span>
              <input
                type="file"
                name="file"
                className="hidden"
                onChange={(e) => {
                  this.handleFileUpload(e);
                }}
              />
            </label>
          </div>
          <span className="text-white">
            File Uploaded : {this.state.filename}
          </span>
          <div className="flex items-center justify-center">
            <button
              className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5"
              type="submit"
            >
              PREDICT
            </button>
          </div>
        </form>
        {/* <div>{this.data.message}</div> */}
        <div className=" mt-[5rem] mb-4 text-2xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-600 from-blue-900 font-black">
            Detected Image is : {this.state.val}
          </span>
        </div>
        <Footer theme={this.props.theme} onToggle={this.props.onToggle} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default QuizImageUpload;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { removeLocation } from "../../shared/gpt";

// const QuizImageUpload = () => {
//   const [selectedFiles, setSelectedFiles] = useState(null);

//   const handleFileChange = (e) => {
//     setSelectedFiles(e.target.files);
//   };

//   const handleUpload = async () => {
//     if (!selectedFiles) {
//       alert("Please select files to upload.");
//       return;
//     }

//     const formData = new FormData();
//     for (let i = 0; i < selectedFiles.length; i++) {
//       formData.append("file", selectedFiles[i]);
//     }

//     console.log("form: ", formData);

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/upload",
//         formData
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error uploading files:", error);
//     }
//   };

//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_URL}/explore`
//       );
//       setData(response.data);
//       console.log(removeLocation(response.data));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }

//     // try {
//     //   const cityName = "Miami, Florida, US";
//     //   const encodedCityName = encodeURIComponent(cityName);
//     //   console.log(encodedCityName);

//     //   const response = await axios.get(
//     //     `${process.env.REACT_APP_API_URL}/api/query/${encodedCityName}`
//     //   );
//     //   // setData(response.data);
//     //   console.log(response.data);
//     // } catch (error) {
//     //   console.error("Error fetching data:", error);
//     // }

//     useEffect(() => {
//       fetchData();
//     }, []);
//   };

//   const testAPI = async () => {
//     try {
//       const cityName = "Miami, Florida, US";
//       const encodedCityName = encodeURIComponent(cityName);

//       // const response = await axios.post(
//       //   `${process.env.REACT_APP_API_URL}/api/query`,
//       //   { location: encodedCityName }
//       // );

//       const response = await axios.post(`http://localhost:8080/api/query`, {
//         location: cityName,
//       });

//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" multiple onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//       <button onClick={testAPI}>click me</button>
//     </div>
//   );
// };

// export default QuizImageUpload;
