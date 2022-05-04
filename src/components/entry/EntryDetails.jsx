import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import ReviewItem from '../review/ReviewItem';
import CreateReview from '../review/CreateReview';

export default function EntryDetails(props) {
  const navigate = useNavigate();
  const location = useLocation()
  const { id } = location.state
  const [entryDetails, setEntryDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  const [currentUserId, setCurrentUserId] = useState();

  function deleteEntry({id}) {
    Axios.delete('/entry/' + id)
        .then(response => {
            console.log("Deleted entry");
            console.log(response.data);
            navigate('/');

        })
        .catch(error => console.log(error));
  }

  useEffect(() => {
    // Retrieve entries from database
  Axios.get('/entry/' +  id)
      .then(response => {
          setEntryDetails(response.data)
      });
  },[]);


  useEffect(() => {
    // Retrieve reviews from database
  Axios.get('/entry/' +  id + '/review/')
      .then(response => {
          setReviews(response.data)
      });
  });

  // check if user can edit or delete
  useEffect(() => {
    Axios.get('/user/userId/')
    .then(response => {
      console.log("current user: " + response.data.id);
      const currentUser = response.data.id;
      setCurrentUserId(currentUser)
    });
  }, []);

  if (!entryDetails) {
    return (<div>
        Loading entry details, please wait...
    </div>)
  }

  return (
    <div key={id}>
      <h2>{entryDetails.title}</h2>
      <hr></hr>
      <h3>{entryDetails.genre}</h3><h3>{entryDetails.release}</h3>
      <div>{entryDetails.content}</div>
      <br></br><br></br>
      {entryDetails.user === currentUserId ? <button onClick={ () => deleteEntry({id})}>delete entry</button> : <p></p>}
      {entryDetails.user === currentUserId ? <Link to="/updateEntry" state ={{id: id}}><button>update entry</button></Link> : <p></p>}
      <br></br><br></br>
      <CreateReview entryId={id} />
      <hr></hr>
      <br></br>
      <ReviewItem list={reviews} entryId={id}/>
  </div>
  )
}