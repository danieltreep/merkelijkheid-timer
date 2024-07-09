function prefixZero(n) {
    if (n < 10) {
        return "0" + n;
    }
    return n;
}

function makeDateSqlCompatible(date) {
    // Get the timezone offset in minutes and convert to milliseconds
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    
    // Create a new Date object adjusted to the local time
    const localTime = new Date(date.getTime() - timezoneOffset);
    
    // Format the adjusted date to MySQL-compatible format
    const mysqlDatetime = localTime.toISOString().replace('T', ' ').slice(0, -5);

   
    return mysqlDatetime;
}

function calculateTimeDifference(startTime, endTime) {
    
    const timeDifferenceInMilliseconds = endTime - startTime;
    const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60);
    return Math.floor(timeDifferenceInMinutes);
}

function calculateTimeElapsed(startTime, endTime) {
  
    const timeElapsedMs = endTime.getTime() - startTime.getTime();
    const timeElapsedMsDate = new Date(timeElapsedMs);

    const elapsedSeconds = prefixZero(timeElapsedMsDate.getUTCSeconds());
    const elapsedMinutes = prefixZero(timeElapsedMsDate.getUTCMinutes());
    const elapsedHours = prefixZero(timeElapsedMsDate.getUTCHours());

    return `${elapsedHours}:${elapsedMinutes}:${elapsedSeconds}`;
}

export { prefixZero, makeDateSqlCompatible, calculateTimeDifference, calculateTimeElapsed };