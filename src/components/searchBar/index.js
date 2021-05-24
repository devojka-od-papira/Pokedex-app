import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { Icon } from "@iconify/react";
import pokeballIcon from "@iconify-icons/mdi/pokeball";
import { Button } from "@material-ui/core";
import { submitPokemonAction } from "../../actions";

const useStyles = makeStyles((theme) => ({
  grow: {
    // flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.2),
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.3),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "100%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
  buttonIcon: {
    marginRight: theme.spacing(2),
    position: "absolute",
    right: theme.spacing(2),
    backgroundColor: "white",

    "&:hover": {
      backgroundColor: "#ff3509",
      "& svg ": {
        color: "white",
      },
    },
  },
  ballIcon: {
    color: "#ff3509",
    iconSize: "50x50",
  },
  form: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
}));

function SearchBar({ submitPokemon }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");

  function handleChange(event) {
    setSearchValue(event.target.value);

    dispatch(submitPokemonAction(event.target.value));
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(submitPokemonAction(searchValue));
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form className={classes.form} onSubmit={handleSubmit}>
              <InputBase
                onChange={handleChange}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
              <Button onClick={submitPokemon} className={classes.buttonIcon}>
                <Icon className={classes.ballIcon} icon={pokeballIcon} />
              </Button>
            </form>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default SearchBar;
