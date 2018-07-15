import Types from 'enums/types.js'
// sample data for testing
export const pokemon = [
  {
    name: "Bulbasaur",
    id: 1,
    icon: require("assets/icons/pokemon/regular/bulbasaur.png"),
    types: [Types.GRASS, Types.POISON],
    description: "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger.",
    stats: {
      "hp": 45,
      "attack": 49,
      "defense": 49,
      "speed": 45,
      "special attack": 65,
      "special defense": 65
    }
  },
  {
    name: "Ivysaur",
    id: 2,
    icon: require("assets/icons/pokemon/regular/ivysaur.png"),
    types: [Types.GRASS, Types.POISON]
  },
  {
    name: "Venusaur",
    id: 3,
    icon: require("assets/icons/pokemon/regular/venusaur.png"),
    types: [Types.GRASS, Types.POISON]
  },
  {
    name: "Charmander",
    id: 4,
    icon: require("assets/icons/pokemon/regular/charmander.png"),
    types: [Types.FIRE]
  },
  {
    name: "Charmeleon",
    id: 5,
    icon: require("assets/icons/pokemon/regular/charmeleon.png"),
    types: [Types.FIRE]
  },
  {
    name: "Charizard",
    id: 6,
    icon: require("assets/icons/pokemon/regular/charizard.png"),
    types: [Types.FIRE, Types.FLYING]
  },
  {
    name: "Squirtle",
    id: 7,
    icon: require("assets/icons/pokemon/regular/squirtle.png"),
    types: [Types.WATER]
  },
  {
    name: "Wartortle",
    id: 8,
    icon: require("assets/icons/pokemon/regular/wartortle.png"),
    types: [Types.WATER]
  },
  {
    name: "Blastoise",
    id: 9,
    //icon: require("assets/icons/pokemon/regular/blastoise.png"),
    icon: require("assets/icons/pokemon/regular/blastoise.png"),
    types: [Types.WATER]
  },
]

// TODO: find somewhere else to put this
// colors for the various types
export const CSS_COLORS = {
  "any": "var(--pokedex-green)",
  [Types.GRASS]: "var(--color-grass)",
  [Types.WATER]: "var(--color-water)",
  [Types.POISON]: "var(--color-poison)",
  [Types.ELECTRIC]: "var(--color-electric)",
  [Types.FLYING]: "var(--color-flying)",
  [Types.FIRE]: "var(--color-fire)"
}

export default {pokemon, CSS_COLORS}