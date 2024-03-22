


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