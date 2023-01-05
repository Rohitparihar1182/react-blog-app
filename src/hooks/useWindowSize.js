import React from 'react'

const useWindowSize = () =>{
    const [windowSize, setWindowSize] = React.useState({
        width : undefined,
        height : undefined
    })
    React.useEffect(()=>{
        const handleResize = () =>{
            setWindowSize({
                width : window.innerWidth,
                height : window.innerHeight
            })
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return ()=>{
            window.removeEventListener('resize', handleResize)
        }
    },[])
    return windowSize
}

export default useWindowSize