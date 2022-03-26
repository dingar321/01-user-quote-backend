module.exports = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: 'pass123',
    database: process.env.POSTGRES_DATABASE,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
    cli: {
        migrationsDir: 'src/database/migrations',
    },
};