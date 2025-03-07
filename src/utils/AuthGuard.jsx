import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GuardedRoutes(props) {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    var isValidUser = sessionStorage.getItem("token");

    if (
      isValidUser === "undefined" ||
      isValidUser === null ||
      isValidUser === ""
    ) {
      return navigate("/");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
}

export default GuardedRoutes;
