const checkStatus = (status: string) => status === 'pending' ||
    status === 'finished' ||
    status === 'delayed' ||
    status ==='outdated'

export default checkStatus