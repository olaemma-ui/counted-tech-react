


/**
 * 
 * @param inputDate 
 * @returns 
 */
export function convertDateFormat(inputDate : string | Date) {
    // Parse the input date string
    const parsedDate = new Date(inputDate);

    // Extract year, month, and day
    const year = parsedDate.getFullYear();
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = parsedDate.getDate().toString().padStart(2, '0');

    // Construct the formatted date string
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

interface DateDiff{
    date1: string,
    date2: string,
}
export function dateDiff(props: DateDiff) {
    
    let date1 : Date = new Date(props.date1);
    let date2 : Date = new Date(props.date2);

    // Handle cases where the times are on the opposite side of midnight
    if (date2 < date1) {
        date2.setDate(date2.getDate() + 1);
    }

    // Calculate the time difference in milliseconds
    let diffMs = date2.getTime() - date1.getTime(); // Difference in milliseconds
    let diffDays = Math.floor(diffMs / 86400000); // Days
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // Hours
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // Minutes
    
    return {
        diffMs,
        diffMins,
        diffHrs,
        diffDays
    }
    
}