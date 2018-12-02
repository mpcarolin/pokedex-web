import axios from 'axios';

function testPokeFlex()
{
	let baseUri = 'http://localhost:5000/pokemon/'

	const end = 807
	for (let i = 1; i < end; i++)
	{
		const fullUri = baseUri + i
		setTimeout(() => {
			axios.get(fullUri, (json) => { 
				console.log(`Received the json from PokeFlex for Pokemon with id {i}`)
			})
		}, 100 * i)
	}

}

export const runTests = () => {
}

export default { runTests }