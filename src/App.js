import React from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import About from "./components/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Missing from "./components/Missing";
import Home from "./components/Home";
import Nav from "./components/Nav";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import EditPost from "./components/EditPost";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useStoreActions, useStoreState } from "easy-peasy";

function App() {
    const searchResults = useStoreState(state => state.searchResults)
    const setPosts = useStoreActions(actions => actions.setPosts)
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts')
      // functions
    
    React.useEffect(()=>{
      setPosts(data)
    }, [data, setPosts])
    return (
      <div className="App">
          <Header title="React js Blog" />
          <Nav />
          <Routes>
              <Route exact path="/" element={<Home searchResults={searchResults} isLoading={isLoading} fetchError={fetchError}/>} />
              <Route exact path="/home" element={<Home searchResults={searchResults} isLoading={isLoading} fetchError={fetchError} />} />
              <Route exact path="/post" element={<NewPost />} />
              <Route path="/editpost/:id" element={<EditPost />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Missing />} />
          </Routes>
          <Footer />
      </div>
  );
}

export default App;
