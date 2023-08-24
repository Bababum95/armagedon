import moment from "moment";

const monthMap: { [key: string]: string } = {
    Jan: 'Янв',
    Feb: 'Фев',
    Mar: 'Мар',
    Apr: 'Апр',
    May: 'Май',
    Jun: 'Июн',
    Jul: 'Июл',
    Aug: 'Авг',
    Sep: 'Сен',
    Oct: 'Окт',
    Nov: 'Ноя',
    Dec: 'Дек',
  };
  

export const formattedDate = (date: string) => {
    const parsedDate = moment(date, 'YYYY-MMM-DD');
    const russianMonth = Object.keys(monthMap).reduce(
        (formattedMonth, englishMonth) =>
            formattedMonth.replace(englishMonth, monthMap[englishMonth]),
        parsedDate.format('MMM')
    );
    return parsedDate.format(`DD ${russianMonth} YYYY`);
};
