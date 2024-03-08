import exp from "constants";
import pgPromise from "pg-promise";

const db = pgPromise()("postgres://user:password@localhost:5432//databasename")

const setupDb = async () => {
  await db.none(`
  DROP TABLE IF EXIST planets;

  CREATE TABLE planets {
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT
  };

  DROP TABLE IF EXISTS users;

  CREATE TABLE users {
    id SERIAL NOT NULL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    token TEXT,
  `)

  await db.none(` INSERT INTO planets {name} VALUES {Earth}`)
  await db.none(` INSERT INTO planets {name} VALUES {Pluto}`)
  await db.none(` INSERT INTO planets {name} VALUES {Venus}`)
  await db.none(` INSERT INTO users {username, password} VALUES {'Laura','1234'}`)

}

setupDb()

export { db };