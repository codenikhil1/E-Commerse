import React,{useState} from 'react';
import Base from '../core/Base'
import { isAutheticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import adminapicall, { createCategory } from './helper/adminapicall'
function AddCategory() {
    const [name,setName] = useState('initialState')
    const [error,setError] = useState(false)
    const[success,setSuccess] = useState(false);
    const {user,token} = isAutheticated()
    const goBack = ()=>(
        <div className='mt-5'>
            <Link className='btn btn-sm btn-info mb-3' to='/admin/dashboard'>
                Admin home
            </Link>
        </div>

    )
const handlechange = event=>{
    setError('')
    setName(event.target.value)
}
const onSubmit = (event)=>{
    event.preventDefault();
    setError('')
    setSuccess(false)

    createCategory(user._id,token,{name})
        .then(data=>{
            if(data?.error){
                setError(true)
                setSuccess('false')
             }else{
                 setName('')
                 setSuccess(true)
                 setError(false)

             }
        })
}

const successMessage = ()=>{
    if(success){
        return <h4 className='text-success'>Category Created Successfully</h4>
    }
}

const errorMessage = ()=>{
    if(error){
        return <h4 className='text-success'>Not able to create Category</h4>
    }
    
}
    const myCategoryform = ()=>(
            <form>
                <div className='form-group'>
                    <p class='lead'> Enter Category</p>
                    <input type='text' className='form-control my-3'
                    autoFocus
                    required
                    placeholder=' Eg .Summer'
                    onChange={handlechange}
                    value={name}
                    ></input>
                    <button onClick={onSubmit} className='btn btn-outline-info'>
                    Create category
                    </button>
                </div>
            </form>
    )
    return (
        <div>
            <Base title='create new category' className='container bg-info p-4'>
                    <div className='row bg-white rounded'>
                        <div className='col-md-8 offset-md-2'>
                        {successMessage()}
                        {errorMessage()}    
                        {myCategoryform()}
                            {goBack()}
                        </div>
                    </div>
            </Base>
        </div>
    )
}
export default AddCategory;
