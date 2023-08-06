export default function formatDate(date: string) {
    const toDate = new Date(date);
    return toDate.toLocaleString("tr-TR");
}