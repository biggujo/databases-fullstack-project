import { format } from 'date-fns';

const DATE_FORMAT = 'yyyy-MM-dd HH:mm';

const formatWithDefault = (date) => format(date || new Date(), DATE_FORMAT);

const DateFormatters = {
  DATE_FORMAT,
  formatWithDefault,
};

export default DateFormatters;
