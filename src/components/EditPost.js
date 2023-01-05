import React from 'react'
import { format } from 'date-fns';
import { useParams, useNavigate } from 'react-router'
import { useStoreState, useStoreActions } from 'easy-peasy'

export default function EditPost() {
    const {id} = useParams();
    const navigate = useNavigate('/');

    const editPost = useStoreActions(actions => actions.editPost);
    const editBody = useStoreState(state => state.editBody);
    const setEditBody = useStoreActions(actions => actions.setEditBody);
    const editTitle = useStoreState(state => state.editTitle);
    const setEditTitle = useStoreActions(actions => actions.setEditTitle);
    const post = useStoreState(state => state.getPostById)(id);

    React.useEffect(()=>{
        if(post){
            setEditBody(post.body)
            setEditTitle(post.title)
        }
    },[post])

    function handleEdit(){
        const datetime = format(new Date(), `MMMM dd, yyyy pp`);
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        editPost(updatedPost);
        navigate('/');
    }

    return (
        <main className="NewPost">
            {post ? <>
                <h2>Edit Post</h2>
                <form onSubmit={(e)=>e.preventDefault()} className="newPostForm" autoComplete='off'>
                    <label htmlFor="postTitle">Title</label>
                    <input 
                        type="text" 
                        id="postTitle" 
                        required
                        value={editTitle} 
                        name='postTitle'
                        onChange={ (e)=>setEditTitle(e.target.value) }
                    />
                    <label htmlFor="postBody">Post</label>
                    <textarea 
                        id='postBody'
                        name="postBody"
                        required
                        value={editBody}
                        onChange={ (e)=>setEditBody(e.target.value) }
                    >
                    </textarea>
                    <button onClick={()=>handleEdit(post.id)} type="button">Submit</button>
                </form>
            </>:
            <>
                <h2>Post not Found</h2>
                <h2>Visit our homepoge</h2>
            </>}
        </main>
    )
}
