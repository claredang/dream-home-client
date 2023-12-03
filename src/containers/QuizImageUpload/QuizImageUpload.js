import React, { Component } from "react";
import "./QuizImageUpload.css";
import axios from "axios";

class QuizImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      val: "Upload image to predict",
      filename: "No file Uploaded",
      file: null,
    };
  }

  componentDidMount() {}

  handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", this.state.file);
    console.log(this.state.file, this.state.file.name);

    axios.post("/api/upload", formData).then((res) => {
      console.log(res.data.message);
      this.setState({ val: res.data.message });
    });
    alert("File uploaded successfully");
  };

  handleFileUpload = (event) => {
    const file = event.target.files[0];
    this.setState({ filename: file.name, file: file });
  };

  render() {
    return (
      <>
        <h1 className=" mt-[5rem] mb-4 text-3xl font-extrabold dark:text-indigo-800 md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-600 from-blue-900">
            Machine Learning Model to
          </span>
          <br /> Detect cats & Dogs
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
      </>
    );
  }
}

export default QuizImageUpload;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function QuizImageUpload() {
//   const [data, setData] = useState(null);

//   var config = [];

//   function handleTestAPI() {
//   axios
//     .post("http://localhost:9874/api/test", {
//       key1: "value1",
//       key2: "value2",
//     })
//     .then((response) => {
//       console.log("Response:", response.data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:9874/api/data");
//         setData(response.data);
//         console.log("Inside here", response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>React App</h1>
//       {data && <p>Data from Flask: {data.message}</p>}
//       <button onClick={handleTestAPI}>test api</button>
//     </div>
//   );
// }

// export default QuizImageUpload;
