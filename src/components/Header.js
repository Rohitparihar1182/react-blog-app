import React from 'react'
import useWindowSize from '../hooks/useWindowSize';
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa'

export default function Header(props) {
    const { width } = useWindowSize();
    return (
        <header className="Header">
            <h1>{props.title}</h1>
            { width < 768 ? <FaMobileAlt /> : width < 992 ? <FaTabletAlt /> : <FaLaptop />}
        </header>
    )
}
