'use strict'
const audioElement = document.getElementById('audio')
const button = document.getElementById('button')


// Disable/Enable Button
const toggleButton = () => {
	button.disabled = !button.disabled
}

// Passing Joke to VoiceRSS API
const tellMe = async (joke) => {
	VoiceRSS.speech({
		key: 'bea5ca153b0849f8b9bf415d2b1c00c9',
		src: joke,
		hl: 'en-us',
		r: 0,
		c: 'mp3',
		f: '44khz_16bit_stereo',
		ssml: false
	})
}

// Get Jokes from Joke API
const getJokes = async () => {
	toggleButton()
	let joke = ''
	const url = 'https://v2.jokeapi.dev/joke/Any';
	try {
		const res = await fetch(url)
		const data = await res.json()
		joke = data.setup ? `${data.setup} ... ${data.delivery}` : data.joke
		tellMe(joke)
	} catch (error) {
		console.log('Whoops', error)
	}
}

// Event Listeners
button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)
