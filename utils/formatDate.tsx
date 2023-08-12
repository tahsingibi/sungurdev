export function formatDate(date: string) {
    if (date) {
        const toDate = new Date(date);
        return toDate.toLocaleString("tr-TR", {
            weekday: 'long', year:
                'numeric', month: 'long', day: 'numeric'
        });
    }

    return '';
}

