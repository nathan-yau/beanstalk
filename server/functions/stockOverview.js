const convertTimeStamp = require('./convertTimeStamp');

const stockOverview = (result) => {
    overview = {}
    stockMeta = ['symbol', 'currency', 'exchangeName', 'instrumentType', 'previousClose']
    for (var i = 0; i < stockMeta.length; i++) {
        overview[stockMeta[i]] = result.meta[stockMeta[i]]
    }
    
    priceHint = result.meta.priceHint
    currentOpen = result.indicators.quote[0].open;
    high = result.indicators.quote[0].high;
    low = result.indicators.quote[0].low;
    currentClose = result.indicators.quote[0].close;
    volume = result.indicators.quote[0].volume.reduce((partialSum, a) => partialSum + a, 0)
    timestamp = result.timestamp
    const priceData = timestamp.map((time, index) => [
        Number(Number(currentOpen[index]).toFixed(priceHint)), 
        Number(Number(high[index]).toFixed(priceHint)), 
        Number(Number(low[index]).toFixed(priceHint)), 
        Number(Number(currentClose[index]).toFixed(priceHint))]
        )

    currentClose = currentClose.filter(function (value) {return value != null;})
    high = high.filter(function (value) {return value != null;})
    low = low.filter(function (value) {return value != null;})
    currentOpen = currentOpen.filter(function (value) {return value != null;})
    
    
    exchangeTimezoneName = result.meta.exchangeTimezoneName

    overview['currentPrice'] = Number(currentClose[currentClose.length - 1]).toFixed(priceHint)
    overview['currentHigh'] = Number(Math.max(...high)).toFixed(priceHint)
    overview['currentLow'] = Number(Math.min(...low)).toFixed(priceHint)
    overview['priceChange'] = Number(currentClose[currentClose.length - 1] - overview['previousClose']).toFixed(priceHint)
    overview['priceChangePercent'] = Number((currentClose[currentClose.length - 1] - overview['previousClose']) / overview['previousClose'] * 100).toFixed(2)
    overview['volume'] = Number(volume).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    overview['lastUpdate'] = convertTimeStamp(timestamp[timestamp.length - 1]).replace(",", "")
    overview['timezone'] = exchangeTimezoneName

    moneyformatting = ['currentPrice', 'currentHigh', 'currentLow', 'priceChange']
    for (var i = 0; i < moneyformatting.length; i++) {
        overview[moneyformatting[i]] = overview[moneyformatting[i]].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    
    
    chartData = []
    for (var i = 0; i < timestamp.length; i++) {
        if (!(priceData[i].includes(0) || priceData[i].includes(null)) ) {
            timestamp[i] = convertTimeStamp(timestamp[i])
            chartData.push({"x": timestamp[i], "y": priceData[i]})
        }
    }

    overview['chartData'] = chartData

    return overview
}

module.exports = stockOverview;