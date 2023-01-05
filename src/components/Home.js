import React from 'react'
import Post from './Post'

export default function Home({searchResults, isLoading, fetchError}) {
	const elementsToDisplay = searchResults.map(post => <Post key = {post.id} post = {post} />)
	return (
		<main className='Home'>
			{isLoading ? 
				<p className='statusmsg'>Loading...</p> : 
				fetchError ? 
				<p className='statusmsg' style={{color:'red'}}>{fetchError}</p> :
				(searchResults.length) ? 
				(elementsToDisplay) : 
				(<p style={{marginTop: '2rem'}}>No posts to display</p>)
			}
		</main>
	)
}
