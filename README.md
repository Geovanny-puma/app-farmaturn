# App Farmaturn

Backend application built with NestJS, TypeORM, and PostgreSQL.

## Project setup

```bash
$ npm install
```

## Environment

The project reads environment variables from `.env`.

```bash
DATABASE_URL=postgresql://user:password@localhost/db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=db
POSTGRES_SYNCHRONIZE=false
POSTGRES_LOGGING=false
```

If `DATABASE_URL` is defined, the database connection uses that URL. Otherwise, it uses the `POSTGRES_*` variables.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Custom Commands

This project uses a single database. Migration commands run against the connection configured in `.env`.

### Create Database Migrations

```bash
# Generate a migration from entity changes
$ npm run migration-make --name="{name}"
# e.g. npm run migration-make --name=CreateTableUsers
# Note: this command requires entity changes. If there are no changes, TypeORM will not create a migration.

# Create an empty migration
$ npm run migration-create --name="{name}"
# e.g. npm run migration-create --name=CreateCustomIndex
```

### Run Database Migrations

```bash
# Run pending migrations
$ npm run migrate
```

### Revert Last Database Migration

```bash
# Revert the last executed migration
$ npm run migrate-down
```

### Revert All Database Migrations

```bash
# Revert every executed migration
$ npm run migrate-down-all
```
