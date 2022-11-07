import httpService from "./http.service";

const userService = {
    create: async ({ id, ...rest }) => {
        try {
            const { data } = await httpService.put(`users/${id}`, { id, ...rest })
            return data
        } catch (e) {
            throw Error(e)
        }
    },
    getCurrentUser: async (userId: string) => {
        try {
            const { data } = await httpService.get(`users/${userId}`)
            return data
        } catch (e) {
            throw Error(e)
        }
    }
}

export default userService