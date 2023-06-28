const axios = require('axios'); 

const fetchData = async (url) => {
    try {
        const response = await axios.get(url)
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = fetchData;