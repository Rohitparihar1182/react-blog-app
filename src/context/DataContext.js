import React, { createContext } from 'react';
import { format } from "date-fns";
import api from '../api/posts'
import useAxiosFetch from "../hooks/useAxiosFetch";
import { useNavigate } from 'react-router';

const DataContext = createContext([]);

export const DataProvider = ({ children }) => {
    // States
    const [posts, setPosts] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [postTitle, setPostTitle] = React.useState("");
    const [postBody, setPostBody] = React.useState("");
    const [editTitle, setEditTitle] = React.useState('');
    const [editBody, setEditBody] = React.useState('')
    const navigate = useNavigate();
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts')
    
    // functions
    React.useEffect(()=>{
      setPosts(data)
    }, [data])
  
    React.useEffect(() => {
      const fitleredResults = posts.filter(
        (post) =>
          post.body.toLowerCase().includes(search.toLowerCase()) ||
          post.title.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(fitleredResults.reverse());
    }, [posts, search]);
  
    function handleNewPostChange(e) {
        const { name, value } = e.target;
        if (name === "postTitle") {
          setPostTitle(value);
        } else {
          setPostBody(value);
        }
      }
    
      async function handleSubmit(e) {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), `MMMM dd, yyyy pp`);
        const newPost = { id, title: postTitle, datetime, body: postBody };
        try{
          const response = await api.post('/posts', newPost)
          setPosts((prevState) => [...prevState, response.data]);
          setPostBody("");
          setPostTitle("");
          navigate("/");
        }
        catch(err){
          console.log(err)
        }
      }
    
      async function handleEdit(id){
        const datetime = format(new Date(), `MMMM dd, yyyy pp`);
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        try{
          const response = await api.put(`/posts/${id}`, updatedPost)
          setPosts(posts.map(post => post.id === id ? {...response.data} : post))
          setEditTitle('')
          setEditBody('')
          navigate('/')
        }catch(err){
          console.log(err)
        }
      }
    
      function handleSearch(e) {
        setSearch(e.target.value);
      }
    
      async function deletePost(id) {
        try{
          await api.delete(`/posts/${id}`)
          setPosts((prevState) => {
            return prevState.filter((post) => post.id !== id);
          });
        }
        catch(err){
          console.log(err)
        }
        navigate("/home");
        // history.push('/')
      }
    return (
        <DataContext.Provider
            value={{
                search, handleSearch,
                searchResults, fetchError, isLoading,
                handleSubmit, postTitle, postBody, handleNewPostChange,
                posts, handleEdit, editBody, editTitle, setEditBody, setEditTitle,
                navigate, deletePost
            }}    
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataContext