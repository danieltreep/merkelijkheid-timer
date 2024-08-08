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

function reduceTimeElapsed(sessions) {

    let totalSeconds = 0;
    
    sessions.forEach(session => {
        
        let amountOfColleagues = 1;
        
        if (session.shared_with) {
            amountOfColleagues += session.shared_with.length; // Als sessie gedeeld is tel op bij aantal collega's
        }

        const [hours, minutes, seconds] = session.time_elapsed.split(':').map(Number);

        totalSeconds += ((hours * amountOfColleagues) * 3600) + ((minutes * amountOfColleagues) * 60) + seconds;
    });

    const totalHours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const totalMinutes = Math.floor(totalSeconds / 60);

    const formattedTime = `${String(totalHours).padStart(2, '0')}:${String(totalMinutes).padStart(2, '0')}`;
    return formattedTime;
}

function getFirstDayOfPreviousMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const previousMonth = month === 0 ? 11 : month - 1;
    const previousMonthYear = month === 0 ? year - 1 : year;

    return new Date(previousMonthYear, previousMonth, 1);
}

function getLastDayOfPreviousMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const firstDayOfCurrentMonth = new Date(year, month, 1);
    const lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth - 1);

    return lastDayOfPreviousMonth;
}

function timeStringToSeconds(timeStr) {
    
    const [hours, minutes] = timeStr.split(':').map(Number);
    return (hours * 3600) + (minutes * 60) ;
}

function calculateChange(current, previous) {
    const currentSeconds = timeStringToSeconds(current);
    const previousSeconds = timeStringToSeconds(previous);

    if (previousSeconds === 0) {
        return currentSeconds === 0 ? '0%' : '0%'; 
    }

    const difference = currentSeconds - previousSeconds;
    const percentageDifference = (difference / previousSeconds) * 100;

    if (difference < 0) {
        return `-${Math.abs(Math.round(percentageDifference))}%`;
    } else {
        return `${Math.round(percentageDifference)}%`;
    }
}

function groupSessionsByClient(sessions, clients) {

    let clientSessions = []

    clients.forEach(client => {
        const sessionsByThisClient = sessions.filter(session => session.client_id === client.client_id)
        
        const { client_name, client_id, color } = client

        clientSessions.push({
            client_name,
            client_id,
            color,
            sessions: sessionsByThisClient,
            total_time_elapsed: reduceTimeElapsed(sessionsByThisClient)
        })
    })

    return clientSessions
}

export { 
    prefixZero, 
    makeDateSqlCompatible,
    calculateTimeElapsed,
    parseDateString,
    formatDate,
    getBaseUrl,
    reduceTimeElapsed,
    getFirstDayOfPreviousMonth,
    getLastDayOfPreviousMonth,
    groupSessionsByClient,
    calculateChange
};