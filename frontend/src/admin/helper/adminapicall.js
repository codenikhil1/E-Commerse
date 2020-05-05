import { API } from "../../backend";

export const createCategory= (userId,token,category) =>{
    return fetch(`${API}category/create/${userId}`,{
        method:'POST',
        headers:{
            Accept:'application/JSON',
            'Content-Type':'application/JSON',
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>{
        console.log(err)
    })
}

//getAll categories
export const getAllCategories = ()=>{
    return fetch(`{API}categories`,{
        method:'GET'
    })
    .then(
        res=>{
            return res.json()
        }
    )
    .catch(err=>{
        console.log(err)
    })
}


//product calls

//create prpducts
export const createaProduct  = (userId,token,product)=>{
    return fetch(`${API}product/create/${userId}`,{
        method:'POST',
        headers:{
            Accept:'application/JSON',
            Authorization:`Bearer ${token}`
        },
        body:product
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>{
        console.log(err)
    })
    
}

//get all products
export const getAllProducts = ()=>{
    return fetch(`{API}products`,{
        method:'GET'
    })
    .then(
        res=>{
            return res.json()
        }
    )
    .catch(err=>{
        console.log(err)
    })
}

//delete product
export const deleteaProduct  = (productId,userId,token)=>{
    return fetch(`${API}product/${productId}/${userId}`,{
        method:'DELETE',
        headers:{
            Accept:'application/JSON',
            Authorization:`Bearer ${token}`
        }
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>{
        console.log(err)
    })
    
}

//getAProduct
export const getProduct = productId =>{
    return fetch(`{API}product/{productId}`,{
        method:'GET'
    })
    .then(
        res=>{
            return res.json()
        }
    )
    .catch(err=>{
        console.log(err)
    })
}



//update product
export const updateaProduct  = (productId,userId,token,product)=>{
    return fetch(`${API}product/${productId}/${userId}`,{
        method:'PUT',
        headers:{
            Accept:'application/JSON',
            Authorization:`Bearer ${token}`
        },
        body:product
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>{
        console.log(err)
    })
    
}