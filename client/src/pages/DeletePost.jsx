import React,{useContext,useEffect, useState} from 'react'
import { Link, useNavigate ,useLocation} from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const DeletePost = ({postId:id}) => {
  const navigate=useNavigate();
  const [isLoading,setIsLoading]=useState(false);
  const {currentUser}=useContext(UserContext);
  const token =currentUser?.token;
  const location=useLocation();
  //redirect to login page to the any user who isn't logged in 
  useEffect(()=>{
    if(!token){
      navigate('/login');
    }
  },[])
  // console.log("delete id:", id);
  const removePost = async ()=>{
    setIsLoading(true)
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
      if(response.status===200)
      {
          if(location.pathname === `/myposts/${currentUser?.id}`)
          {
            toast.success('Post deleted Successfully!', {
              position: 'bottom-left',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            navigate(0);
          }
          else{
            toast.success('Post deleted Successfully!', {
              position: 'bottom-left',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            navigate('/');
          }
        
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }
  if(isLoading)
  {
    return <Loader/>
  }
  return (
    <Link className='btn sm danger' onClick={()=>removePost(id)}>Delete</Link>
  )
}

export default DeletePost