import React from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const { userid } = useParams();
  return (
    <div className="flex items-center justify-center bg-gray-600 text-white p-4 text-3xl">
      User: {userid}4
    </div>
  );
};

export default User;
