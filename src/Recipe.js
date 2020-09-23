import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Paper, Button } from "@material-ui/core";
import "./Recipe.module.css";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 375,
    minWidth: 375,
    maxHeight: "fitContent",
  },
  media: {
    height: 0,
    maxHeight: 300,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function Recipe({
  title,
  ingredients,
  desc,
  calories,
  img,
  author,
  learnMore,
  weight,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <Paper elevation={3} className={classes.root}>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {author.charAt(0)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <i className="fas fa-sliders-h"></i>
              </IconButton>
            }
            title={title}
            subheader={`By:- ${author}`}
          />
          <CardMedia className={classes.media} image={img} title={title} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              <ol>
                {ingredients.map((ingredient) => (
                  <li>{ingredient}</li>
                ))}
                <li>
                  <b>
                    {Math.floor(calories)} calories for {weight}kg
                  </b>
                </li>
              </ol>
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <i className="fas fa-heart"></i>
            </IconButton>
            <IconButton aria-label="share">
              <i className="fas fa-share"></i>
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <i className="fas fa-expand"></i>
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Description</Typography>
              <ol>
                {desc.map((des) => (
                  <li>{des}</li>
                ))}
              </ol>
              <Typography paragraph>
                <Button variant="outlined" color="primary" href={learnMore}>
                  Learn More !!
                </Button>
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Paper>
    </div>
  );
}
export default Recipe;
