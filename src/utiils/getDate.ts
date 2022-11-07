import { format } from 'date-fns'
import { ru } from 'date-fns/esm/locale'

export function getDate(unix: number) {
    return format(new Date(unix), 'dd MMMM kk:mm',  { locale: ru })
}