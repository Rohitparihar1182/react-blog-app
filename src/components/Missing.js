import React from 'react'
import { Link } from 'react-router-dom'

export default function Missing() {
	return (
		<main className="Missing">
			<h2>Page not found</h2>
			<p>
				<Link to="/">
					Visit to the Homepage
				</Link>
			</p>
		</main>
	)
}
