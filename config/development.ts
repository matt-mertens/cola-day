export const config = {
    server: {
        port: 3000
    },
    db: {
        type: 'postgres',
        port: 5432,
        database: 'coladay',
        password: 'admin111',
        syncronize: true
    },
    auth: {
        jwt: {
            expiresIn: 3600,
            secret: 'test'
        }
    }
}