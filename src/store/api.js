import axios from 'axios';
import { PokemonPreview } from './pokemon.js'

const previewURI = 'http://localhost:4545/pokemon/previews'

function getPokemonPreviews() {
	return new Promise((resolve, reject) => {
		axios.get(previewURI).then(response => {
			if (response.status === 200) {
				const previews = response.data.map(json => new PokemonPreview(json))
				resolve(previews)
			} else {
				reject(response.status)
			}
		})	
	})
}

export default { getPokemonPreviews }