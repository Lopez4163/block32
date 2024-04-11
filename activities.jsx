const client = require("./client.js")

const getActivities = async () => {
  try {
    const { rows } = await client.query(`SELECT * FROM activities`)
    return rows
  } catch (err) {
    console.log(err.message)
  }
}

const createActivities = async (activityName, activityDescrip) => {
  try {
    await client.query(`
    INSERT INTO activities (name, description)
    VALUES ('${activityName}', '${activityDescrip}');
  `)
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = { getActivities, createActivities }
