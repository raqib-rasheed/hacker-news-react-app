import React from 'react'
import axios from 'axios'
import {debounce} from 'lodash'


export default function Lists(){
  const [results,setResults] = React.useState([])
  const [query,setQuery] = React.useState('')

  const getNewsfunc = React.useCallback(
  async ()=>{
    const options = { 
      method: 'GET',
      url: 'https://hn.algolia.com/api/v1/search?',
      params: {query: query ,page:1}
    };
    const {data} = await axios.request(options)
    setResults(data.hits)
  },[query])
  
  React.useEffect(()=>{
    getNewsfunc()
  },[getNewsfunc])
  function handleChange(event){
    setQuery(event.target.value)
  }

  return(
    <>
    <div>
      <input 
      onChange={debounce(handleChange,500)}
      
      className="form-control border border-3" placeholder="Type your query here" />
    </div>
  {results && results.map(result=>{
  return (
  <div className="card mt-2">
    <div className="card-body">
      <h5 className="card-title text-white">{result.title ?? "Title unavailable"}</h5>
      <h6 className="card-subtitle mb-2 text-light">Author: <span className="text-warning">{result.author}</span></h6>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <div className="text-center">
      <a href={result.url} target="_blank" rel="noreferrer" className="text-center text-primary">read more</a>
      </div>
  </div>
</div>
    )}
    )
    }
    </>
    )

}