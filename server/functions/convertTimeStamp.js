const convertTimeStamp = (timestamp, exchangeTimezoneName) => {
    const date = new Date(timestamp * 1000);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: exchangeTimezoneName };
    const formattedDateTime = date.toLocaleString(undefined, options);
    return formattedDateTime;
}

module.exports = convertTimeStamp;