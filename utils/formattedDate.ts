export const formattedDate = (date: string) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString('ru-RU', {
        year: 'numeric', month: 'short', day: 'numeric'
    }).replace(/\./g, '').slice(0, -1);
}