export default function isoDate (date) {
    return new Date(date).toISOString().slice(0,10);
}