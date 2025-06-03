import React, { useEffect } from "react";
import logo from "../../public/logo.webp";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import axios from "axios";

const Home = () => {
  const [course, setCourse] = useState([]);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/course/getcourses",
          {
            withCredentials: true,
          }
        );
        setCourse(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error in fetch courses!!!");
      }
    };
    fetchCourse();
  }, []);
  return (
    <div className="bg-gradient-to-r from-black to-blue-950 h-screen">
      <div className="text-white container pl-10 pr-10">
        {/* Header */}
        <header className="flex items-center justify-between pt-6">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="logo" className="h-10 w-10 rounded-full" />
            <h1 className="text-2xl text-orange-500 font-bold">CourseHaven</h1>
          </div>
          <div className="space-x-4">
            <Link
              to={"/login"}
              className="bg-transparent text-white py-2 px-4 border border-white rounded"
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="bg-transparent text-white py-2 px-4 border border-white rounded"
            >
              SignUp
            </Link>
          </div>
        </header>

        {/* Main Section */}
        <section className="text-center py-20">
          <h1 className="text-4xl font-semibold text-orange-500">
            CourseHaven
          </h1>
          <br />
          <br />
          <p className="text-gray-500">
            Sharpen your skills with courses crafted by experts.
          </p>
          <div className="space-x-4 mt-8">
            <button className="bg-green-500 text-white py-3 px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black">
              Explore Courses
            </button>
            <button className="bg-white text-black py-3 px-6 rounded font-semibold hover:bg-green-500 duration-300 hover:text-white">
              Courses Videos
            </button>
          </div>
        </section>
        <section>Section 2</section>

        {/* Footer */}
        <footer>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2">
                <img src={logo} alt="logo" className="h-10 w-10 rounded-full" />
                <h1 className="text-2xl text-orange-500 font-bold">
                  CourseHaven
                </h1>
              </div>
              <div className="mt-3 md:ml-8 ml-2">
                <p className="mb-2">Follow Us</p>
                <div className="flex space-x-4">
                  <a href="">
                    <FaFacebook className="hover:text-blue-400 text-2xl duration-300" />
                  </a>
                  <a href="">
                    <FaInstagram className="hover:text-pink-600 text-2xl duration-300" />
                  </a>
                  <a href="">
                    <FaTwitter className="hover:text-blue-600 text-2xl duration-300" />
                  </a>
                </div>
              </div>
              <div>
                <h3>Connects</h3>
                <ul>
                  <li>youtube- learn coding</li>
                  <li>telegram- learn coding</li>
                  <li>Github- learn coding</li>
                </ul>
              </div>
              <div>right</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
