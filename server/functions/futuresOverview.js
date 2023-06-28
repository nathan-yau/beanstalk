const convertTimeStamp = require('./convertTimeStamp');

const futuresOverview = (result, symbol) => {
    overview = {}
    result = result.data.split("\r\n").map(x => x.split(","))
    const sessionOpening = result.map(arr => arr[6]);
    
    result = result.slice(sessionOpening.lastIndexOf('1')-1, result.length-1)
    overview['previousClose'] = result[0][3]
    overview['symbol'] = symbol
    result = result.slice(1, result.length-1)

    high = result.map(arr => arr[1])
    low = result.map(arr => arr[2])
    currentClose = result.map(arr => arr[3])
    volume = result.map(arr => Number(arr[4]))
    timestamp = result.map(arr => arr[5])

    overview['currentHigh'] = Number(Math.max(...high)).toFixed("2")
    overview['currentLow'] = Number(Math.max(...low)).toFixed("2")
    overview['currentPrice'] = Number(currentClose[currentClose.length - 1]).toFixed("2")
    overview['volume'] = volume.reduce((partialSum, a) => partialSum + a, 0)
    overview['lastUpdate'] = convertTimeStamp(timestamp[currentClose.length - 1]).replace(",", "")
    overview['instrumentType'] = 'FUTURES'
    overview['priceChange'] = Number(overview['currentPrice'] - overview['previousClose'])
    overview['priceChangePercent'] = Number((overview['currentPrice'] - overview['previousClose']) / overview['previousClose'] * 100).toFixed(2)
    overview['timezone'] = ''
    overview['currency'] = ''
    overview['exchangeName'] = ''
    return overview
}

module.exports = futuresOverview;