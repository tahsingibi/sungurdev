export default function formatDate(date: string) {
    const toDate = new Date(date);
    return toDate.toLocaleString("tr-TR", {
        weekday: 'long', year:
            'numeric', month: 'long', day: 'numeric'
    });
}

export function clearedDate(date: string) {
    return formatDate(date)
}