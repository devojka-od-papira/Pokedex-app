import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import { CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";


const useStyles = makeStyles({
  root: {
    width: "calc(100% / 4 - 20px)",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    textDecoration: "none",
  },
  single: {
    width: 200,
  },
  imagePok: {
    width: 150,
    height: 150,
  },
  areaCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 250,
  },
  chip: {
    margin: "0 4px",
  },
  wrap: {
    padding: 100,
  },
});

function PokeCard({ name, url, single }) {
  const classes = useStyles();
  const [description, setDescription] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setDescription(res.data);
      })
      .catch((error) => {
        console.log("error", error.response);
      });
  }, [url]);


  function capitalize(string) {
    return string && string[0].toUpperCase() + string.slice(1);
  }

  return description ? (
    <Link
      to={`/detail/${description.id}`}
      className={single ? classes.single : classes.root}
    >
      <Card className={classes.wrap}>
        <CardActionArea className={classes.areaCard}>
          <div>
            <CardMedia className={classes.media} image="" title="">
              <img
                src={description.sprites.front_shiny}
                alt=""
                className={classes.imagePok}
              />
            </CardMedia>
            <Typography gutterBottom variant="h5" component="h2">
              {capitalize(name)}
            </Typography>
            {description.types.map((type) => {
              return (
                <Chip
                  className={classes.chip}
                  variant="outlined"
                  size="small"
                  label={capitalize(type.type.name)}
                />
              );
            })}
          </div>
        </CardActionArea>
      </Card>
    </Link>
  ) : null;
}
export default PokeCard;
