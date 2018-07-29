# uFree - server

API + databse with SSO protected routes.  

## Getting Started

First you have to create your local db. For this application a PostgreSQL database is used.

### Database creation
Start Postgres shell     
```
psql postgres
```

Create extra user with role
```
CREATE ROLE ufree WITH LOGIN PASSWORD 'ufree!';
```

Add role to create DB for new created user 'ufree'
```
ALTER ROLE ufree CREATEDB;
```

Create a database
```
CREATE DATABASE ufree_db_test;
```

login as ufree user
```
psql postgres -U ufree
```

Grant user ufree to access database
```
GRANT ALL PRIVILEGES ON DATABASE ufree_db_test TO ufree;
```

Connect to database
```
\connect ufree_db_test
```

Inject seed.sql for creating table "applications"
```
// Go to file and enter
\i ./seed.sql
```

### Helpful Show databases

Show databases

```
\du
```

List databases

```
\list
```

Show tables of database

```
\dt
```
