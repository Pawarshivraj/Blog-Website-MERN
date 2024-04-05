import React, { useState ,useContext,useEffect} from "react";
import { DUMMY_POSTS } from "../data";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Loader from '../components/Loader';
import axios from "axios";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
import { BASE_URL, BASE_URL_IMAGE } from "../api";

const DashBoard = () => {
  const [posts ,setPosts]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const {id}=useParams();
  //  console.log(id)

  const navigate=useNavigate();
  const {currentUser}=useContext(UserContext);
  const token =currentUser?.token;
  //redirect to login page to the any user who isn't logged in 
  useEffect(()=>{
    if(!token){
      navigate('/login');
    }
  },[])

  const fetchPosts =async()=>{
    setIsLoading(true);
   try {
    const response = await axios.get(`${BASE_URL}/posts/users/${id}`,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}});
    console.log("DATA: ", response);
    setPosts(response.data);
   } catch (error) {
    console.log(error.response.data.message);
   }
   setIsLoading(false);
  }
  console.log("all posts: ", posts);
  useEffect (()=>{
    fetchPosts();
  },[ id])
  if(isLoading)
  {
    return <Loader/>
  }
  return (
    <section className="dashboard">
      {posts.length ? (
        <div className="container dashboard__container">
          {posts.map((post) => {
            return (
              <article key={post._id} className="dashboard__post">
                <div className="dashboard__post-info">
                  <div className="dashboard__post-thumbnail">
                    <img src={`${BASE_URL_IMAGE}/uploads/${post.thumbnail}`} alt="" />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard__post-actions">
                  <Link to={`/posts/${post._id}`} className="btn sm">View</Link>
                  <Link to={`/posts/edit/${post._id}`} className="btn sm primary">
                 {console.log("hi",post._id)}
                  Edit</Link>
                  {/* <EditPost postId={post._id}/> */}
                  <DeletePost postId={post._id}/>

                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <h2 className="center">You have no posts yet.</h2>
      )}
    </section>
  );
};

export default DashBoard;