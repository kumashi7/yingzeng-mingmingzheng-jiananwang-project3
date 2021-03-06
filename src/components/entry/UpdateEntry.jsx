import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { useNavigate, useParams } from "react-router";

export default function UpdateEntry(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const [title, setTitle] = useState("");
  const [release, setRelease] = useState("");
  const [genre, setGenre] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    Axios.get("/entry/" + id).then((response) => {
      console.log(response.data);
      setTitle(response.data.title);
      setRelease(response.data.release);
      setGenre(response.data.genre);
      setContent(response.data.content);
    });
  }, []);

  // if (!title) {
  //     return (<div>
  //         Loading entry details, please wait...
  //     </div>)
  // }

  function updateEntryAxios(id, title, genre, release, content, event) {
    event.preventDefault();
    Axios.put("/entry/" + id, { title, genre, release, content })
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div key={id} className="container">
      <form
        className="form"
        onSubmit={(event) =>
          updateEntryAxios(id, title, genre, release, content, event)
        }
      >
        <h2>UPDATE ENTRY</h2>
        {/*<label for="title">title:</label>*/}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id="title"
          name="title"
          className="box"
          placeholder="Title"
        />
        {/*<label for="genre">genre:</label>*/}
        <input
          type="text"
          id="genre"
          name="genre"
          className="box"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        {/*<label for="release">release:</label>*/}
        <input
          type="number"
          id="release"
          name="release"
          className="box"
          value={release}
          onChange={(e) => setRelease(e.target.value)}
        />
        {/*<label for="content">content:</label>*/}
        <input
          type="text"
          id="content"
          name="content"
          className="box"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button id="submit" className="box">
          Submit
        </button>
      </form>
    </div>
  );
}
