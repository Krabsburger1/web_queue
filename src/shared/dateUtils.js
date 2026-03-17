/**
 * Returns a date string in YYYY-MM-DD format in local time.
 * Using 'en-CA' locale reliably returns YYYY-MM-DD.
 */
export function getLocalDateString(date = new Date()) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

