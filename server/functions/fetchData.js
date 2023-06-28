const axios = require('axios'); 

const fetchData = async (url) => {
    // type === 'stock'? url=`https://query2.finance.yahoo.com/v8/finance/chart/${symbol}` : 
    //                   url=`http://chart1.spsystem.info/pserver/chartdata_query.php?&action=spchart&prod_code=${symbol}&second=60`;
    try {
        const response = await axios.get(url)
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = fetchData;