import axios from 'axios';
import { Error } from '../components/Alert';
const URL = 'http://localhost:5000/api/user';


export const registerUser= async (data) =>{
  try{
     return await axios.post(
      `${URL}/sign-up`,
      data
      );
  }
  catch(error){
      //console.log(error)   
  }
}


export const loginUser= async (data) =>{
  try{
     return await axios.post(
      `${URL}/login`,
      data
      );
  }
  catch(error){
      //console.log(error)   
  }
}



export const getLoggedUser= async (token) =>{
  try{
      return await axios({
        method:'get',
        url:`${URL}/loggeduser`,
        headers:{
            'authorization' : `Bearer ${token}`,
        }   
      })
  }
  catch(error){
        return error.response; 
  }
}

export const addNewEmployee= async (data) =>{
  try{
     return await axios.post(
      `${URL}/admin/add-new-employee`,
      data
      );
  }
  catch(error){
      //console.log(error)
      Error(error.message)   
  }
}

export const getAllEmployee = async()=>{
  try{
    return await axios({
      method: 'get',
      url:`${URL}/getAllEmployee`, 
      }
      )
  }
  catch(error){
    console.log(error)
  }
}

export const deleteEmployee = async (id) => {
  await axios({
    method: 'delete',
    url:`${URL}/getAllEmployee`, 
    params: {
        paramId: id,
      },
    }
  )
}