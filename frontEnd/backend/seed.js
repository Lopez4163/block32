const client = require("./client.cjs")
const { getActivities, createActivities } = require("./activities.jsx")
const { getRoutines, createRoutines } = require("./routines.jsx")
const {
  getActivities_Routines,
  createActivities_Routines,
} = require("./activities_routines.jsx")

const createTables = async () => {
  try {
    await client.query(`
      CREATE TABLE activities (
        activities_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL
      );
      CREATE TABLE routines (
        routines_id SERIAL PRIMARY KEY,
        is_public BOOLEAN NOT NULL,
        goal TEXT NOT NULL
      );
      CREATE TABLE activities_routines (
        activities_routines_id SERIAL PRIMARY KEY,
        activities_id INTEGER REFERENCES activities,
        routines_id INTEGER REFERENCES routines,
        count INTEGER NOT NULL

      );
    `)
  } catch (err) {
    console.log(err.message)
  }
}

const dropTables = async () => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS activities_routines;
      DROP TABLE IF EXISTS activities;
      DROP TABLE IF EXISTS routines;
    `)
  } catch (error) {
    console.log(error.message)
  }
}

const syncAndSeed = async () => {
  await client.connect()
  console.log("CONNECTED TO DB")

  await dropTables()
  console.log("TABLES DROPPED")

  await createTables()
  console.log("CREATED TABLES")

  await createActivities("crunch master", "making crunching abs")
  await createActivities("arm blaster", "making some blasting arms")
  console.log("CREATED ACTIVITIES")

  await createRoutines("true", "get bigger arms")
  await createRoutines("true", "get a tight core")
  console.log("CREATED ROUTINES")

  await createActivities_Routines(1, 2, 5)
  await createActivities_Routines(2, 1, 5)
  console.log("CREATED ACTIVITIES_ROUTINES")

  await client.end()
  console.log(`CONNECTION ENDED`)
}

syncAndSeed()
