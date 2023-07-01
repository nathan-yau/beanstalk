const convertTimeStamp = (timestamp, exchangeTimezoneName = null) => {
    const date = new Date(timestamp * 1000);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false};
    if (exchangeTimezoneName) {
        options.timeZone = exchangeTimezoneName;
    }
    const formattedDateTime = date.toLocaleString(undefined, options).replace(', 24:', ', 00:');
    return formattedDateTime;
}

module.exports = convertTimeStamp;