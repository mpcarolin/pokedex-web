import Types from 'enums/types.js'
import StringUtils from 'util/StringUtils'

function cleanName (name) {
  const charactersToClear = ["'", "."] //,"0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  let cleaned = name.toLowerCase()
  charactersToClear.forEach(char => {
    cleaned = cleaned.replace(char, "")
  })
  return cleaned.replace(" ", "-")
}

export class PokemonPreview {
  constructor (json) {
    this.name = StringUtils.capitalize(json['en'] || "")
    this.id = json['dex_num']
    const types = []
    if (json['type1']) {
      types.push(json['type1'])
    }
    if (json['type2']) {
      types.push(json['type2'])
    }
    this.types = types
    this.icon = null
    try {
      // maybe find a better way to do this
      this.icon = require(`assets/icons/pokemon/regular/${cleanName(this.name)}.png`)
    } catch (err) {
      console.log(err)
    }
  }  
}

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

export default { PokemonPreview, CSS_COLORS }