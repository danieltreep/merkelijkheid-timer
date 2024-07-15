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

function calculateTimeElapsed(startTime, endTime) {
  
    const timeElapsedMs = endTime.getTime() - startTime.getTime();
    const timeElapsedMsDate = new Date(timeElapsedMs);

    const elapsedSeconds = prefixZero(timeElapsedMsDate.getUTCSeconds());
    const elapsedMinutes = prefixZero(timeElapsedMsDate.getUTCMinutes());
    const elapsedHours = prefixZero(timeElapsedMsDate.getUTCHours());

    return `${elapsedHours}:${elapsedMinutes}:${elapsedSeconds}`;
}

function parseDateString(dateString) {
    const [day, month, year] = dateString.split('-').map(Number);
  
    return [day, month - 1, year]; // month is 0-based in JavaScript Date object
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function getBaseUrl() {
    if (window.location.href.includes('localhost')) {
        return 'http://localhost/merkelijkheid-timer/api.php'
    } else {
        return 'https://merkelijkheid.today/api.php'
    }
}

export { prefixZero, makeDateSqlCompatible,  calculateTimeElapsed, parseDateString, formatDate, getBaseUrl };