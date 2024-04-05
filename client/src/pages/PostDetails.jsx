import React ,{useContext,useEffect,useState} from "react";
import PostAuthor from "../components/PostAuthor";
import { Link, useParams } from "react-router-dom";
import Thumbnail from "../images/blog22.jpg";
import { UserContext } from "../context/userContext";
import Loader from "../components/Loader";
import DeletePost from "./DeletePost";
import axios from "axios";
import { BASE_URL, BASE_URL_IMAGE } from "../api";
const PostDetails = () => {

  const {id} =useParams();
  const [post,setPost]=useState(null)
 
  const [error,setError]=useState(null)
  const [isLoading,setIsLoading]=useState(false)

  const {currentUser}=useContext(UserContext)
   useEffect(()=>{
    const getPost =async()=>{
      setIsLoading(true);
      try {
        const response=await axios.get(`${BASE_URL}/posts/${id}`);
        console.log(response.data);
        setPost(response.data);
        
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    }
    getPost();
   },[])
  if(isLoading)
  {
    return <Loader/>
  }

  return (
    <div>
      <section className="post-details">
      {error && <p className="error">{error}</p>}
        {post &&<div className="container post-detail__container">
          <div className="post-detail__header">
            <PostAuthor authorID={post.creator}  createdAt={post.createdAt} />
            {currentUser?.id === post?.creator && <div className="post-detail__buttons">
              <Link to={`/posts/edit/${post?._id}`} className="btn sm primary">
                Edit
              </Link>
               <DeletePost postId={id}/> 
            </div> }
          </div>
          <h1>{post.title}</h1>
          <div className="post-detail__thumbnail">
            <img src={`${BASE_URL_IMAGE}/uploads/${post.thumbnail}`} alt="" />
          </div>
          <p dangerouslySetInnerHTML={{__html:post.description}}></p>
        </div>}
      </section>
    </div>
  );
};

export default PostDetails;