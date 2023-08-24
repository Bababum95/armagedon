import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formattedDate = (date: string) => {
    const parsedDate = new Date(date);
    return format(parsedDate, 'dd MMM yyyy', { locale: ru }).replace(/\./g, '');
};