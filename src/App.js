import React, { useEffect, useState } from "react";

import { db } from "./firebase";
import logo from "./newLogo.svg";
import Recipe from "./Recipe";
import { Button, TextField } from "@material-ui/core";
import Share from "./Share";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/share" exact component={Share}></Route>
          <Route path="/" exact component={Home}></Route>
        </Switch>
      </Router>
    </div>
  );
}

// Main Homepage component
/////
////

function Home() {
  function text(e) {
    let textQuery = e.target.value;
    setSearch(textQuery.replaceAll(" ", "+"));
  }
  function getSearch(e) {
    e.preventDefault();

    getData(search);
  }
  const [recipies, setRecipies] = useState([]);
  const [shares, setShares] = useState([]);
  const [search, setSearch] = useState("");
  // const [query, setQuery] = useState("");
  let key = 0;
  // useEffect(() => {
  //   getData();
  // }, [query]);
  useEffect(() => {
    db.collection("share").onSnapshot((snapshot) => {
      setShares(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);
  let getData = async (q) => {
    let url = `https://api.edamam.com/search?q=${q}&app_id=9373167b&app_key=46134d9a64e9c26e7ffcc2cc26c63776&from=0&to=10&calories=591-722&health=alcohol-free`;
    let response = await fetch(url);
    let data = await response.json();
    setRecipies(data.hits);
  };

  return (
    <div>
      <div className="background">
        <header>
          <img src={logo} alt="logo" className="logo" />
          <h1>Welcome to Manducare</h1>
        </header>
        <div className="searchField">
          <form autoComplete="off" onSubmit={getSearch}>
            <TextField
              required
              id="outlined-basic"
              label="Search for food recipies"
              className="input"
              variant="outlined"
              onChange={text}
            />
          </form>

          <Button
            color="primary"
            variant="contained"
            className="submitBtn"
            onClick={getSearch}
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </Button>
        </div>
      </div>
      <div className="backgroundBottom">
        <div className="trending">
          <h2>
            <span> -----------</span>----People's Recipes-----
            <span>-----------</span>
          </h2>
        </div>
        <Button
          className="share"
          color="secondary"
          variant="outlined"
          href="/share"
        >
          <div className="share-text">
            <h3>Share your recipes</h3>
          </div>
          <div className="share-icon">
            <i className="fas fa-share-alt-square"></i>
          </div>
        </Button>
      </div>
      <hr height={2500} />
      <div className="recipeContainer">
        {recipies.map((recipe) => (
          <Recipe
            key={(key += 1)}
            author={`${recipe.recipe.source}(Bot)`}
            // desc={recipe.healthLabels}
            weight={Math.floor(recipe.recipe.totalWeight) / 1000}
            desc={["Click below to know more!!"]}
            title={recipe.recipe.label}
            img={recipe.recipe.image}
            learnMore={recipe.recipe.url}
            ingredients={recipe.recipe.ingredientLines}
            calories={recipe.recipe.calories}
          />
        ))}

        {shares.map((share) => (
          <Recipe
            key={(key += 1)}
            author={share.author}
            title={share.title}
            desc={share.desc}
            img={share.image}
            learnMore={share.link}
            ingredients={share.materials}
            weight={share.weight}
            calories={share.calories}
          />
        ))}

        <div className="findMeOn">
          This app has been developed by Parag Jyoti Pal, using REACT{" "}
          <a href="https://github.com/p-arag">
            <b>
              Find Me on Github<i className="fab fa-github"></i>
            </b>
          </a>
        </div>
      </div>
    </div>
  );
}
export default App;
