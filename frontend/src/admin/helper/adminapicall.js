import { API } from "../../backend";

export const createCategory= (userId,token,category) =>{
    return fetch(`${API}/category/create/${userId}`)

}