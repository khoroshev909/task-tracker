import {IQueryParams} from "../types/other";

const getParamsString = (params: IQueryParams):string => {
    if (!Object.keys(params).length) return ''
    return '?' + Object.keys(params).map(key => `${key}=${params[key]}`).reverse().join('&')
}

export default getParamsString