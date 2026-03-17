/**
 * Returns a date string in YYYY-MM-DD format in local time.
 * Using 'en-CA' locale reliably returns YYYY-MM-DD.
 */
export function getLocalDateString(date = new Date()) {
    return date.toLocaleDateString('en-CA')
}
