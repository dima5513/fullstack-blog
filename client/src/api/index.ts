import ky from 'ky'

const api = ky.create({
    prefixUrl: 'http://localhost:3001/api',
    credentials: 'include',
    hooks: {
        beforeError: [
            error => {
                return error.response.json()
            },
        ],
    },
    headers: {
        Cookie: document.cookie,
    },
})

export { api }
