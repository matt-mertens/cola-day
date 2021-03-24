export const config = {
    server: {
        port: 3000
    },
    api: {
        version: 'v1'
    },
    db: {
        type: 'postgres',
        port: 5432,
        syncronize: false
    },
    auth: {
        jwt: {
            expiresIn: 3600
        }
    }
}