const axios = require("axios");
const GIPHY_URL_KEY = "IZes4hXLVJoXbzl0gHycqenqggyx16lM"

const categories = ['dog', 'cat', 'funny', 'meme', 'random','family_guy']
const limit = 10;


const {
    feelingLowSubMenuOptions,
} = require("../../messages.json");

const GET_GIF = async function gif(language, name) {
    const offset = Math.floor(Math.random() * 101);
    const q = categories[Math.floor(Math.random() * categories.length)]
    const random = Math.floor(Math.random() * 11);
    const URL = `http://api.giphy.com/v1/gifs/search?api_key=${GIPHY_URL_KEY}&q=${q}&limit=${limit}&offset=${offset}`
    const config = {
        method: 'get',
        url: URL
    }

    try {
        var response = await axios(config)
        var random_gif = response.data.data[random].embed_url
        if(!random_gif) GET_GIF()
        const message = random_gif + '\n' + feelingLowSubMenuOptions[language]

        return message
    } catch (error) {
        console.log(error)
        return("error")
    }

}

module.exports = GET_GIF


