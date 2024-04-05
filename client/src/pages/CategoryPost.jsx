import React ,{useContext,useEffect,useState}from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostItem from '../components/PostItem';
import { BASE_URL } from '../api';
const CategoryPost = () => {
  const [posts,setPosts]=useState([])
  const [isLoading,setIsLoading]=useState(false);
  const {category}=useParams();

  useEffect(()=>{
    const fetchPosts = async() =>{
       setIsLoading(true);
       try {
        const response =await axios.get(`${BASE_URL}/posts/categories/${category}`)
        setPosts(response?.data);
       } catch (err) {
        console.log(err);
       }
       setIsLoading(false);
    }
    fetchPosts();
  },[category])
return (
  <section className='posts'>
    {posts.length>0 ?<div className='container posts__container'>
    {
      posts.map(({_id:id,thumbnail,category,title,description,creator,createdAt})=><PostItem key ={id} postID={id} 
      thumbnail={thumbnail} category={category} title={title} description={description} 
      authorID={creator} createdAt={createdAt}/>)
     }
    </div>: <h1 className='center'>No post Found</h1>}
  </section>
)
}

export default CategoryPost
