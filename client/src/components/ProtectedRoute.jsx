import React from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {getToken, removeToken, storeIsAdmin} from "../services/localStorageServices.js"
import {setUserInfo,unsetUserInfo} from "../features/userSlice.js"
import { getLoggedUser } from '../services/userAuthAPI.js';
const ProtectedRoute = (props) => {

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let token = getToken()
  const getUser = async () => {
      const res = await getLoggedUser(token);
      if(res.data.status==="success"){
        //console.log(res)
        dispatch(setUserInfo({
          name:res.data.user.name,
          email:res.data.user.email,
          isAdmin:res.data.user.isAdmin,
        }))
      }
      else{
        //console.log(res)
        dispatch(unsetUserInfo({name:"",email:"",isAdmin:""}))
        removeToken('token')
        navigate("/login")
      }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  },[user]);

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute