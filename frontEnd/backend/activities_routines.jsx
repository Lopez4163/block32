const client = require("./client.cjs")

const getActivities_Routines = async () => {
  try {
    const { rows } = await client.query(`SELECT * FROM activities_routines`)
    return rows
  } catch (err) {
    console.log(err.message)
  }
}

const createActivities_Routines = async (activitiesId, routinesId, count) => {
  try {
    await client.query(`
    INSERT INTO activities_routines(activities_id, routines_id, count)
    VALUES (${activitiesId}, ${routinesId}, ${count});
  `)
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = { getActivities_Routines, createActivities_Routines }
