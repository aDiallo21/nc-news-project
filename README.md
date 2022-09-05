# Northcoders News API

## Important Notes

To successfully connect to the two databases you must create `.env` files, one for the dev database and the other for the test database, with the format `PGDATABASE=database_name`

1. Create `.env.development` and `.env.test` files
2. Add the following to each file `PGDATABASE=database_name` (Note: database name for `.env.test` will be the same but with `_test` at the end)
3. You are now connected to the database!