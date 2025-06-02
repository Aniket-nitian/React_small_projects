import React from "react";
import logo from "../../public/logo.webp";
import { Link } from "react-router-dom";

const Home = () => {
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
        <section>Section 1</section>
        <section>Section 2</section>

        {/* Footer */}
        <footer>Footer</footer>
      </div>
    </div>
  );
};

export default Home;
