
//http://localhost:3500/api/notification
import axios from "axios";



export const deleteAlertFromServer = (id) => {
 return axios.delete(`http://localhost:3500/api/notification/${id}`)

}
export const addAlertToServer = (alert) => {
    return axios.post("http://localhost:3500/api/notification/" ,alert)
   
   }
   export const updateAlertInServer = (id, updatedData) => {
    return axios.put(`http://localhost:3500/api/notification/${id}`, updatedData);
}

export const getAlertById = (id) => {
    return axios.get(`http://localhost:3500/api/notification/${id}`);
}
   

   export const getAllAlerts = () => {
    return axios.get("http://localhost:3500/api/notification" )
   
   }

