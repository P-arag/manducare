import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  InputAdornment,
  LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Share.css";
import firebase from "firebase";
import { db, storage } from "./firebase";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    minWidth: 800,
    marginTop: 20,
    height: 1200,
    padding: 9,
  },
}));
// share)
function Share() {
  const classes = useStyles();
  const [shares, setShares] = useState([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [materials, setMaterials] = useState([]);
  const [desc, setDesc] = useState([]);
  const [image, setImage] = useState(null);
  const [link, setLink] = useState("");
  const [progress, setProgress] = useState(0);
  const [weight, setWeight] = useState(0);
  const [calories, setCalories] = useState(0);
  useEffect(() => {
    db.collection("share").onSnapshot((snapshot) => {
      setShares(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);
  function handleUpload(e) {
    // e.preventDefault();
    const descArr = desc.split("**");
    const materialsArr = materials.split("**");
    const submittedName = name;
    const submittedTitle = title;
    const submittedLink = link;
    const submittedWeight = weight;
    const submittedCalories = calories;
    const submittedImage = image;

    e.preventDefault();
    try {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress Function
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          // error function
          console.log(error.message);
          alert(error.message);
        },
        () => {
          // Complete function
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              // console.log(url);
              db.collection("share").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                author: submittedName,
                image: url,
                title: submittedTitle,
                materials: materialsArr,
                desc: descArr,
                link: submittedLink,
                calories: submittedCalories,
                weight: submittedWeight,
              });
            });
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      console.log("igwrigeru");
    }
  }
  function handleImgChange(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }
  return (
    <div className="Share">
      <header className="Share-header">
        <b>Share Your recipies on this app!!</b>
      </header>

      <Paper elevation={6} className={classes.root}>
        <form action="#" autoComplete="off">
          <div className="formData">
            <TextField
              className="textfield"
              label="Enter You Name"
              variant="outlined"
              color="primary"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fas fa-user"></i>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="textfield"
              label="Enter the Name of the Food"
              variant="outlined"
              color="primary"
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fas fa-utensils"></i>
                  </InputAdornment>
                ),
              }}
            />

            <b>
              Please separate two different <br />
              steps by adding ** in between them
            </b>

            <TextField
              label="Enter the Materials required"
              multiline
              onChange={(e) => {
                setMaterials(e.target.value);
              }}
              className="multiline"
              rowsMax={5}
              variant="filled"
              required
            />
            <b>
              Please separate two different
              <br /> methods by adding ** in between them
            </b>
            <TextField
              multiline
              className="multiline"
              rowsMax={5}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              required
              variant="filled"
              label="Enter the description or method"
            />

            <TextField
              className="textfield"
              label="Enter the links to other sources (Optional) "
              variant="outlined"
              onChange={(e) => {
                setLink(e.target.value);
              }}
              color="primary"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fas fa-link"></i>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="textfield"
              label="Enter the weight in KG"
              variant="outlined"
              required
              onChange={(e) => {
                setWeight(e.target.value);
              }}
              type="number"
              color="primary"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fas fa-weight-hanging"></i>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="textfield"
              label="Enter the Calories (Optional)"
              type="number"
              onChange={(e) => {
                setCalories(e.target.value);
              }}
              variant="outlined"
              color="primary"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fab fa-cuttlefish"></i>
                  </InputAdornment>
                ),
              }}
            />
            <LinearProgress value={progress} />
            <input
              type="file"
              required
              className="file"
              onChange={handleImgChange}
            />
            <div className="buttonControl">
              <Button variant="contained" color="primary" type="reset">
                Reset
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Paper>
    </div>
  );
}
export default Share;
