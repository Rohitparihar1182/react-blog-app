import React from 'react'

export default function Footer() {
	const today = new Date();
	return (
		<footer className='Footer'>
			<p>
				Copyright &copy; {today.getFullYear()}
			</p>
		</footer>
	)
}
