import React from 'react'
import axios from 'axios'

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = React.useState([])
    const [fetchError, setFetchError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    
    React.useEffect(()=>{
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async(url) =>{
            setIsLoading(true);
            try{
                const response = await axios.get(url, {
                    cancelToken: source.token
                })
                if(isMounted){
                    setData(response.data)
                    setFetchError(null)
                }
            }catch(err){
                if(isMounted){
                    setFetchError(err.message)
                    setData([])
                }
            }
            finally{
                isMounted && setIsLoading(false)
            }
        }
        fetchData(dataUrl)
        function cleanUp(){
            isMounted = false;
            source.cancel();
        }
        return cleanUp
    }, [dataUrl])
    return { data, fetchError, isLoading }
}

export default useAxiosFetch