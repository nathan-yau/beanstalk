const convertTimeStamp = require('./convertTimeStamp');

const futuresOverview = (result, symbol) => {
    const dataRows = result.data.split("\r\n").map(x => x.split(","));
    const sessionOpening = dataRows.map(arr => arr[6]);
    
    const lastIndex = sessionOpening.lastIndexOf('1');
    const relevantDataRows = dataRows.slice(lastIndex - 1, -1);
    const overviewData = relevantDataRows[0];
    
    const overview = {
      previousClose: overviewData[3],
      symbol: symbol
    };
    
    const currentOpen = [];
    const high = [];
    const low = [];
    const currentClose = [];
    const volume = [];
    const timestamp = [];
    
    for (const row of relevantDataRows) {
      currentOpen.push(row[0]);
      high.push(row[1]);
      low.push(row[2]);
      currentClose.push(row[3]);
      volume.push(Number(row[4]));
      timestamp.push(row[5]);
    }

    overview['currentHigh'] = Number(Math.max(...high)).toFixed("2")
    overview['currentLow'] = Number(Math.max(...low)).toFixed("2")
    overview['currentPrice'] = Number(currentClose[currentClose.length-1]).toFixed("2")
    overview['volume'] = volume.reduce((partialSum, a) => partialSum + a, 0)
    overview['lastUpdate'] = convertTimeStamp(timestamp[timestamp.length-1]).replace(",", "")
    overview['instrumentType'] = 'FUTURES'
    overview['priceChange'] = Number(overview['currentPrice'] - overview['previousClose']).toFixed("2")
    overview['priceChangePercent'] = Number((overview['currentPrice'] - overview['previousClose']) / overview['previousClose'] * 100).toFixed(2)

    fillingBlank = ['timezone', 'currency', 'exchangeName']
    for (var i = 0; i < fillingBlank.length; i++) {
        overview[fillingBlank[i]] = ''
    }

    moneyformatting = ['currentPrice', 'currentHigh', 'currentLow', 'priceChange']
    for (var i = 0; i < moneyformatting.length; i++) {
        overview[moneyformatting[i]] = overview[moneyformatting[i]].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    return overview
}

module.exports = futuresOverview;