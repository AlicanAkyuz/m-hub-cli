import React, { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import root from "../../utils/root";
import Context from "../../context";
import Login from "../auth/Login";
import AuthToken from "../../utils/AuthToken";

const Splash = () => {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    // wake up the server
    const wakeServerUp = async () => {
      try {
        const res = await axios.get(`${root}/users/wakeup`);
        if (res) console.log(res.data.msg);
      } catch (err) {
        console.log("Server is not responding!");
      }
    };

    wakeServerUp();

    // if there is token in local storage, set token headers, user, and auth & user state
    if (localStorage.jwt_token) {
      AuthToken(localStorage.jwt_token);
      const decoded_user = jwt_decode(localStorage.jwt_token);
      dispatch({ type: "AUTH", payload: true });
      dispatch({ type: "SET_USER", payload: decoded_user });
    }
  }, [dispatch]);

  // redirect to the site if user authenticated, otherwise render login screen
  return state.isAuth ? <Redirect to="/map" /> : <Login />;
};

export default Splash;
