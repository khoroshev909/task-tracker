import moment from 'moment';
import 'moment/locale/ru'

export function getDate(unix: number) {
    return moment(unix).locale('ru').format('DD MMM kk:mm')
}