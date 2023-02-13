import { useState, useEffect } from "react";

const useFetch = ({ 
    url,
 }: { 
    url: string,
 }) => {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);

    const getResponse = async () => {
      try {
        setLoading(true);
        await fetch(url, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            setLoading(false);
            setResponse(response);
        });
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    }

    useEffect(()=> {
        getResponse();
    }, []);

    return {
        response,
        loading,
    };
}

export default useFetch;
