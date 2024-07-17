
//http://localhost:4000/api/user
import axios from "axios";


export const getAllUsers = () => {
    return axios.get("http://localhost:4000/api/user")
   }

export const addUserToServer = (user) => {
    return axios.post("http://localhost:4000/api/user",user)
   }

export const login = (user) => {
    return axios.post("http://localhost:4000/api/user/login",user)
    }
    