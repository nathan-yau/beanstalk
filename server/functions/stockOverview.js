const convertTimeStamp = require('./convertTimeStamp');

const stockOverview = (result) => {
    overview = {}
    stockMeta = ['symbol', 'currency', 'exchangeName', 'instrumentType', 'previousClose']
    for (var i = 0; i < stockMeta.length; i++) {
        overview[stockMeta[i]] = result.meta[stockMeta[i]]
    }
    
    priceHint = result.meta.priceHint
    high = result.indicators.quote[0].high.filter(function (value) {return value != null;});
    low = result.indicators.quote[0].low.filter(function (value) {return value != null;});
    currentClose = result.indicators.quote[0].close.filter(function (value) {return value != null;});
    volume = result.indicators.quote[0].volume.reduce((partialSum, a) => partialSum + a, 0)
    timestamp = result.timestamp
    exchangeTimezoneName = result.meta.exchangeTimezoneName

    overview['currentPrice'] = Number(currentClose[currentClose.length - 1]).toFixed(priceHint)
    overview['currentHigh'] = Number(Math.max(...high)).toFixed(priceHint)
    overview['currentLow'] = Number(Math.min(...low)).toFixed(priceHint)
    overview['priceChange'] = Number(currentClose[currentClose.length - 1] - overview['previousClose']).toFixed(priceHint)
    overview['priceChangePercent'] = Number((currentClose[currentClose.length - 1] - overview['previousClose']) / overview['previousClose'] * 100).toFixed(2)
    overview['volume'] = Number(volume).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    overview['lastUpdate'] = convertTimeStamp(timestamp[timestamp.length - 1]).replace(",", "")
    overview['timezone'] = exchangeTimezoneName
    return overview
}

module.exports = stockOverview;