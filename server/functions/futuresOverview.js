const convertTimeStamp = require('./convertTimeStamp');

const futuresOverview = (result, symbol, currency) => {
    const dataRows = result.data.split("\r\n").map(x => x.split(","));
    var breakTime = 0
    lastIndex = dataRows.length - 1
    while (breakTime < 1800) {
      lastIndex = lastIndex - 1
      breakTime = dataRows[lastIndex][5]-dataRows[lastIndex-1][5]
    }

    var relevantDataRows = dataRows.slice(lastIndex - 1, -1);
    var overviewData = relevantDataRows[0]
    var relevantDataRows = relevantDataRows.slice(1, -1);

    {symbol.slice(0, 2) === "F-"? symbol = symbol.slice(2, symbol.length) : symbol = symbol}

    const overview = {
      previousClose: overviewData[3],
      symbol: symbol,
    };
    
    const currentOpen = [];
    const high = [];
    const low = [];
    const currentClose = [];
    const volume = [];
    const timestamp = [];
    
    for (const row of relevantDataRows) {
      // currentOpen.push(row[0]);
      high.push(row[1]);
      low.push(row[2]);
      currentClose.push(row[3]);
      // volume.push(Number(row[4]));
      timestamp.push(row[5]);
    }
    

    overview['currentHigh'] = Math.max(...high)
    overview['currentLow'] = Math.max(...low)
    overview['currentPrice'] = Number(currentClose[currentClose.length-1])
    // overview['volume'] = volume.reduce((partialSum, a) => partialSum + a, 0)
    overview['lastUpdate'] = convertTimeStamp(timestamp[timestamp.length-1]).replace(",", "")
    overview['instrumentType'] = 'FUTURES'
    overview['priceChange'] = overview['currentPrice'] - overview['previousClose']
    overview['movement'] = overview['priceChange'] > 0 ? "+" : overview['priceChange'] < 0 ? "-" : ""
    overview['priceChangePercent'] = Number((overview['currentPrice'] - overview['previousClose']) / overview['previousClose'] * 100).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    overview['currency'] = currency

    fillingBlank = ['timezone', 'exchangeName']
    for (var i = 0; i < fillingBlank.length; i++) {
        overview[fillingBlank[i]] = ''
    }

    moneyformatting = ['currentPrice', 'currentHigh', 'currentLow', 'priceChange']
    for (var i = 0; i < moneyformatting.length; i++) {
        overview[moneyformatting[i]] = overview[moneyformatting[i]].toLocaleString('en', { minimumFractionDigits: 2})
    }


    // const priceData = timestamp.map((_, index) => [
    //   Number(Number(currentOpen[index]).toFixed(priceHint)), 
    //   Number(Number(high[index]).toFixed(priceHint)), 
    //   Number(Number(low[index]).toFixed(priceHint)), 
    //   Number(Number(currentClose[index]).toFixed(priceHint))]
    //   )

    chartData = currentClose
    // for (var i = 0; i < timestamp.length; i++) {
    //     timestamp[i] = convertTimeStamp(timestamp[i])
    //     chartData.push({"x": timestamp[i], "y": priceData[i]})
    // }

    overview['chartData'] = chartData

    return overview
}

module.exports = futuresOverview;