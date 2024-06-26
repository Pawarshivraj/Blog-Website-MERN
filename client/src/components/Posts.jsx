import React, { useEffect, useState } from 'react'

import PostItem from './PostItem';
import Loader from './Loader';
import axios from 'axios'
import { BASE_URL } from '../api';

const Posts = () => {
    const [posts,setPosts]=useState([])
    const [isLoading,setIsLoading]=useState(false);
    useEffect(()=>{
      const fetchPosts = async() =>{
         setIsLoading(true);
         try {
          const response =await axios.get(`${BASE_URL}/posts`);
          setPosts(response?.data);
         } catch (err) {
          console.log(err);
         }
         setIsLoading(false);
      }
      fetchPosts();
    },[])
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

export default Posts