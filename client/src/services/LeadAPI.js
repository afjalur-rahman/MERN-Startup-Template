import axios from 'axios';
import { Error } from '../components/Alert';
const URL = 'http://localhost:5000/api/user';



export const addLead= async (data) =>{
  try{
     return await axios.post(
      `${URL}/add-new-lead`,
      data,
      );
  }
  catch(error){
      //console.log(error)  
      Error(error.message) 
  }
}

export const getAllLead = async(name,email,status)=>{
  try{
    return await axios({
      method: 'get',
      url:`${URL}/all-lead?status=${status}`, 
      params: {
          paramName: name,
          paramEmail: email,
        },
      }
      )
  }
  catch(error){
    console.log(error)
  }
}

export const getAllUserLead = async(status)=>{
  
  try{
    return await axios({
      method: 'get',
      url:`${URL}/admin/all-lead?status=${status}`
      }
      )
  }
  catch(error){
    console.log(error)
  }
}

export const getUser = async(id)=>{
  try{
    return await axios({
      method:'get',
      url:`${URL}/all-lead/${id}`
    })
  }
  catch(error){
    console.log(error)
  }
}

export const deleteUser = async (id) => {
  await axios({
    method: 'delete',
    url:`${URL}/all-lead`, 
    params: {
        paramId: id,
      },
    }
  )
}

export const editLead = async (id, user) => {
  try{
  return await axios.put(`${URL}/all-lead/${id}/edit-lead`, user)
  }
  catch(error){
    console.log(error)
  }
}

export const getDetails = async(isAdmin,name,email)=>{
  try{
    return await axios({
      method:'get',
      url:`${URL}?isAdmin=${isAdmin}&name=${name}&email=${email}`
    })
  }
  catch(error){
    console.log(error)
  }
}



export const addCallback = async (id, callbackDetails) => {
  try{
  return await axios.put(`${URL}/all-lead/${id}/user-specific-details`, callbackDetails)
  }
  catch(error){
    Error(error.message)
  }
}
export const addAdminCallback = async (id, callbackDetails) => {
  try{
  return await axios.put(`${URL}/admin/all-lead/${id}/user-specific-details`, callbackDetails)
  }
  catch(error){
    Error(error.message)
  }
}