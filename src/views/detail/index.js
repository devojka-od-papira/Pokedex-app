import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ResponsivePieCanvas } from "@nivo/pie";
import Chip from "@material-ui/core/Chip";
import {
  fetchPokemonAbilitiesAction,
  submitPokemonAction,
} from "../../actions";

const useStyles = makeStyles({
  wrap: {
    width: "calc(100% - 20px)",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,

    p: {
      marginLeft: 15,
    },
  },
  detailPokemon: {
    width: "calc(100% - 20px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    fontSize: 30,
  },
  statsContainer: {
    display: "flex",
  },
  stat: {
    width: "100%",
    height: 500,
    display: "flax",
    // alignItems: "center",
    // justifyContent: "center",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  chip: {
    margin: "4px 4px",
  },
});

const MyRasponsivePieCanvas = ({ stats }) => (
  <ResponsivePieCanvas
    data={stats}
    margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    colors={{ scheme: "paired" }}
    borderColor={{ from: "color", modifiers: [["darker", 0.6]] }}
    radialLabelsSkipAngle={10}
    radialLabelsTextColor="black"
    radialLabelsLinkColor={{ from: "color" }}
    sliceLabelsSkipAngle={10}
    sliceLabelsTextColor="#333333"
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: "-45",
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: "hp",
        },
        id: "dots",
      },
      {
        match: {
          id: "attack",
        },
        id: "dots",
      },
      {
        match: {
          id: "defense",
        },
        id: "dots",
      },
      {
        match: {
          id: "special-attack",
        },
        id: "lines",
      },
      {
        match: {
          id: "special-defense",
        },
        id: "lines",
      },
      {
        match: {
          id: "speed",
        },
        id: "lines",
      },
    ]}
    legends={[
      {
        anchor: "right",
        direction: "column",
        justify: false,
        translateX: 140,
        translateY: 0,
        itemsSpacing: 5,
        itemWidth: 24,
        itemHeight: 24,
        itemTextColor: "black",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 24,
        symbolShape: "circle",
      },
    ]}
  />
);

function Detail() {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon.pokemonsData[0]);
  const { id } = useParams(); // useParams izvlaci id iz search bar
  const classes = useStyles();
  console.log("pokemon", pokemon);
  const abilities = useSelector((state) => state.pokemon.abilities);

  useEffect(() => {
    dispatch(submitPokemonAction(id));
    dispatch(fetchPokemonAbilitiesAction(id));
  }, []);

  function capitalize(string) {
    return string && string[0].toUpperCase() + string.slice(1);
  }

  return pokemon ? (
    <div>
      <h1 className={classes.detailPokemon}>{capitalize(pokemon.name)}</h1>
      <div className={classes.wrap}>
        <div>
          <img
            className={classes.img}
            src={pokemon.sprites.front_default}
            alt=""
          />
          {pokemon
            ? pokemon.types.map((type) => {
                return (
                  <div>
                    <Chip
                      className={classes.chip}
                      variant="outlined"
                      size="small"
                      label={capitalize(type.type.name)}
                    />
                  </div>
                );
              })
            : null}
          <Chip
            className={classes.chip}
            variant="outlined"
            size="small"
            label={pokemon.weight + " lbs"}
          />
          <Chip
            className={classes.chip}
            variant="outlined"
            size="small"
            label={pokemon.height + " '"}
          />
        </div>
      </div>
      <div className={classes.statsContainer}>
        <div className={classes.stat}>
          <MyRasponsivePieCanvas stats={pokemon.stats} />
        </div>
      </div>
      <div>
        {/* {abilities
          ? abilities.effect_entries
              .filter((entrie) => {
                if (entrie.language.name !== "de") {
                  return entrie;
                }
              })
              .map((entrie) => {
                return <div>{entrie.effect}</div>;
              })
          : null} */}
      </div>
    </div>
  ) : null;
}

export default Detail;
