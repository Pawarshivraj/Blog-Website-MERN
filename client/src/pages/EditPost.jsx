import React, { useState ,useContext,useEffect} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from "axios";
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../api";
const EditPost = () => {
  const {currentUser}=useContext(UserContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error,setError]=useState("");  

  const {id} = useParams();
  console.log("edit file: ",id);
  const navigate=useNavigate();
  const token =currentUser?.token;
  //redirect to login page to the any user who isn't logged in 
  useEffect(()=>{
    if(!token){
      navigate('/login');
    }
  },[]);
  // console.log("edit id:", id);
  const modules = {
    toolbar: [
      [{ header: [1, 2,3,4,5,6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const POST_CATEGORIES =[
    "uncategorized" ,"Agriculture","Business","Education","Entertainment","Art","Investment","Weather"
  ]
 
  const editPost = async(e)=>{
    e.preventDefault();

    const postData=new FormData();
    postData.set('title',title);
    postData.set('category',category);
    postData.set('description',description);
    postData.set('thumbnail',thumbnail);
 
    try {
     const response=await axios.patch(`${BASE_URL}/posts/${id}`,postData,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}});
     console.log("edited response: ", response);
     if(response.status===200)
     {
       toast.success("Post edited successfully !!", {
        position: 'bottom-left',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
       return navigate('/');
     }
 
    } catch (err) {
      console.log(err);
     setError(err.response.data.message);
    }
  }

  const getPost = async()=>{
    try {
      const response = await axios.get(`${BASE_URL}/posts/${id}`)
      setTitle(response.data.title)
      setDescription(response.data.description)

    } catch (err) {
      setError(err.response.data.message );
    }
  }

  useEffect(()=>{
    getPost();
  },[id]);

  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className="form__error-message" >{error}</p>}
        <form className="form create-post__form" onSubmit={editPost}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {
              POST_CATEGORIES.map(cat =><option key={cat}>{cat}</option>)

            }         
</select>
            <ReactQuill modules={modules} formats={formats}  value={description} onChange={setDescription}/>
            <input type="file" onChange={e=>setThumbnail(e.target.files[0])} accept="png ,jpg,jpeg"/>
            <button type="submit" className="btn primary">Update</button>

          
        </form>
      </div>
    </section>
  );
};

export default EditPost;