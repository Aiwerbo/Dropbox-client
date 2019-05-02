import React, {useState, useRef} from 'react';
import { Dropbox } from 'dropbox';
import {token$} from './store.js';
//import { BrowserRouter as Router, Route, Link, Redirect}from "react-router-dom";


const CreateFolder = (props) => {
  

  const [input, updateInput] = useState('')
  const inputRef = useRef(null);
  let newFolder = props.folder
  newFolder = newFolder.substring(5);


  const changeInput = (e) => {
    updateInput(e.target.value)
  }

  const createFolder = () => {

    const option = {
      fetch: fetch,
      accessToken: token$.value,
      
    };
    const dbx = new Dropbox(
      option,
    );
    dbx.filesCreateFolderV2({
      
      path: newFolder + '/'+ input,
      autorename: true
     
    })
    .then(response => {

        
       console.log(response)
       props.create(response)

        
    })
    .catch(function(error) {
        console.log(error);
    });
    inputRef.current.value = '';
  }

  return(
    <>
      <label>Type in new folder name</label>
      <input type="text" onChange={changeInput} ref={inputRef}></input><br></br>
      <button onClick={createFolder}>Create new Folder</button>
    </>
  )
}


export default CreateFolder 