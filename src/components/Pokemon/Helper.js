
// returns true if the pokemon, p, contains the text in its name and the type specified
export const matches = (p, text, type) => {
    let visible = true
    if (text && text.length > 0) {
      visible = p.name.toLowerCase().includes(text.toLowerCase())
    }

    if (type && (type !== "any")) {
      visible = visible && p.types.includes(type)
    }
    return visible
}

export const notEmpty = (s) => ((s != null) && (s.length > 0))

export default {matches, notEmpty}
