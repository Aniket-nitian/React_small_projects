import React, { useState } from "react";
import { FaFileWord } from "react-icons/fa";
import axios from "axios";

const Home = () => {
  const [name, setName] = useState(null);
  const [convert, setConvert] = useState("");
  const [downloadError, setDownloadError] = useState("");

  const handleFileChange = (e) => {
    setName(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setConvert("Please select a file to convert");
      return;
    }
    const formData = new FormData();
    formData.append("file", name);
    try {
      const response = await axios.post(
        "http://localhost:1000/convertfile",
        formData,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(url);
      const link = document.createElement("a");
      console.log(link);
      link.href = url;
      console.log(link);
      link.setAttribute(
        "download",
        name.name.replace(/\.[^/.]+$/, "") + ".pdf"
      );
      console.log(link);
      document.body.appendChild(link);
      console.log(link);
      link.click();
      link.parentNode.removeChild(link);
      setName(null);
      setDownloadError("");
      setConvert("File converted successfully");
      setName;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error);
        setDownloadError("File Error occured: ", error.response.data.message);
      } else {
        setConvert("");
      }
    }
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto container px-6 py-3 md:px-40 shadow-lg h-16">
        <div className="flex h-screen items-center justify-center">
          <div className="border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-400 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold text-center mb-2">
              Convert Word To PDF
            </h1>
            <p className="text-sm text-center mb-5">
              Easily convert Word documents to PDF online, without having
              installing any software
            </p>

            <div className="flex flex-col items-center space-y-4">
              <input
                onChange={handleFileChange}
                type="file"
                accept=".doc,.docx"
                className="hidden"
                id="FileInput"
              />
              <label
                htmlFor="FileInput"
                className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-blue-700 duration-300 hover:text-white"
              >
                <FaFileWord className="text-3xl mr-3 " />
                <span className="text-3xl mr-2">
                  {name ? name.name : "Choose File"}
                </span>
              </label>
              <button
                onClick={handleSubmit}
                disabled={!name} // disable the button if no file is selected
                className="text-white bg-blue-500 hover:bg-blue-700 disabled:bg-gray-300 disabled:pointer-events-none duration-300 font-bold px-4 py-2 rounded-lg"
              >
                Convert File
              </button>
              {convert && (
                <div className="text-green-500 text-center">{convert}</div>
              )}
              {downloadError && (
                <div className="text-green-500 text-center">
                  {downloadError}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
