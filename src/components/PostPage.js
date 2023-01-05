import React from 'react'
import { useParams , Link, useNavigate} from 'react-router-dom'
import { useStoreState, useStoreActions } from 'easy-peasy'

export default function PostPage() {
	const navigate = useNavigate()
	const deletePost = useStoreActions(actions => actions.deletePost)
	const { id } = useParams();
	const getPostById = useStoreState(state => state.getPostById)
	const currPost = getPostById(id);

	function handleDelete(){
		deletePost(currPost.id)
		navigate('/')
	}

    return (
		<main className='PostPage'>
			<article className="post">
				{currPost ? (<>
						<h2>{currPost.title}</h2>
						<p className="postDate">{currPost.datetime}</p>
						<p className="postBody">{currPost.body}</p>
						<button onClick={handleDelete}><i className='fa-solid fa-trash'></i></button>
						<Link to={`/editpost/${id}`}>
							<button>
								<i className='fa-solid fa-pen-to-square'></i>
							</button>
						</Link>
					</>):
					(<>
						<h2>Post not found</h2>
						<p>Visit our Homepage...</p>
					</>)
				}
			</article>
		</main>
    )
}
