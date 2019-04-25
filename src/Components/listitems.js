import React, {useState, useEffect} from 'react';
import {token$} from './store.js';
import { Dropbox } from 'dropbox';
import { BrowserRouter as Router, Route, Link}from "react-router-dom";

const ListItems = (props) => {

  const [data, updateData] = useState(props.listData)

  const navigate = (e) => {
    
   console.log(e.target.dataset.folder)
   console.log(e.target.dataset.tag)

   if(e.target.dataset.tag === 'file'){
     console.log('detta är en fil')
     return;
   }
    //updateFolder(e.target.dataset.folder)

    const option = {
      fetch: fetch,
      accessToken: token$.value
    };
    
    const dbx = new Dropbox(
      option,
    );
    dbx.filesListFolder({
      path: e.target.dataset.folder
    })
    .then(response => {
      console.log(response)
      updateData(response.entries)
     
      
      
    })
    .catch(function(error) {
      console.log(error);
    });


  }
 
  const renderList = (data) => {
    return(
      <li to={data.path_lower} data-name={data.name} onClick={navigate} key={data.id} data-folder={data.path_lower} data-tag={data[".tag"]}>{data.name}</li>
    )
  }

  const listData = data.map(renderList)
  

  return(
    <>
      {listData}
    </>
  )
}

export default ListItems;

{/* <li><Link to={data.path_lower} onClick={navigate} key={data.id} data-folder={data.path_lower} data-tag={data[".tag"]}>{data.name}</Link></li> */}