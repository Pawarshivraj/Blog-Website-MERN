import React,{useContext,useEffect,useState} from 'react'
import PostItem from '../components/PostItem';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../api';
const AuthorsPost = () => {
  const [posts,setPosts]=useState([])
  const [isLoading,setIsLoading]=useState(false);
  const {id}=useParams();

  useEffect(()=>{
    const fetchPosts = async() =>{
       setIsLoading(true);
       try {
        const response =await axios.get(`${BASE_URL}/posts/users/${id}`)
        setPosts(response?.data);
       } catch (err) {
        console.log(err);
       }
       setIsLoading(false);
    }
    fetchPosts();
  },[id])
return (
  <section className='posts'>
    {posts.length>0 ?<div className='container posts__container'>
    {
      posts.map(({_id:id,thumbnail,category,title,description,creator,createdAt})=><PostItem  postID={id} 
      thumbnail={thumbnail} category={category} title={title} description={description} 
      authorID={creator} createdAt={createdAt}/>)
     }
    </div>: <h1 className='center'>No post Found</h1>}
  </section>
)
}

export default AuthorsPost
