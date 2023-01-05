import React from 'react';
import { format } from "date-fns";
import { useNavigate } from 'react-router';
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function NewPost() {
    const navigate = useNavigate();
    const posts = useStoreState(state => state.posts)
    const postTitle = useStoreState(state => state.postTitle);
    const setPostTitle = useStoreActions(actions => actions.setPostTitle);
    const postBody = useStoreState(state => state.postBody);
    const setPostBody = useStoreActions(actions => actions.setPostBody);
    const savePost = useStoreActions(actions => actions.savePost);

    function handleNewPostChange(e) {
        const { name, value } = e.target;
        if (name === "postTitle") {
          setPostTitle(value);
        } else {
          setPostBody(value);
        }
    }

    function handleSubmit(){
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), `MMMM dd, yyyy pp`);
        const newPost = { id, title: postTitle, datetime, body: postBody };
        savePost(newPost);
        navigate('/');
    }
    
    return (
        <main className="NewPost">
            <h2>New Post</h2>
            <form onSubmit={(e)=>e.preventDefault()} className="newPostForm" autoComplete='off'>
                <label htmlFor="postTitle">Title</label>
                <input 
                    type="text" 
                    id="postTitle" 
                    required 
                    value={postTitle} 
                    name='postTitle'
                    onChange={ handleNewPostChange  }
                />
                <label htmlFor="postBody">Post</label>
                <textarea 
                    id='postBody'
                    name="postBody"
                    required
                    value={postBody}
                    onChange={ handleNewPostChange }
                >
                </textarea>
                <button onClick={handleSubmit} type="button">Submit</button>
            </form>
        </main>
    )
}
