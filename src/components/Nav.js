import React from 'react'
import {Link } from 'react-router-dom'
import { useStoreState, useStoreActions } from 'easy-peasy'

export default function Nav() {
	const posts = useStoreState((state) => state.posts);
	const search = useStoreState((state) => state.search);
	const setSearch = useStoreActions((actions) => actions.setSearch);
	const setSearchResults = useStoreActions((actions) => actions.setSearchResults);

	React.useEffect(() => {
		const fitleredResults = posts.filter(
		  (post) =>
			post.body.toLowerCase().includes(search.toLowerCase()) ||
			post.title.toLowerCase().includes(search.toLowerCase())
		);
		setSearchResults(fitleredResults.reverse());
	}, [posts, search, setSearchResults]);
	
    return (
		<nav className="Nav">
			<form className='searchForm' onSubmit={(e)=>e.preventDefault()}>
				<label htmlFor="search">Search Post</label>
				<input 
					autoComplete='off'
					type="text"
					id='search'
					placeholder='Search posts'
					value={search}
					onChange={(e) => setSearch(e.target.value)} />
			</form>
			<ul>
				<li><Link to='/'>Home</Link></li>
				<li><Link to='/post'>Post</Link></li>
				<li><Link to='/about'>About</Link></li>
			</ul>
		</nav>
    )
}
