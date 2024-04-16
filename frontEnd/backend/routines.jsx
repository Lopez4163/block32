const client = require("./client.cjs")

const getRoutines = async () => {
  try {
    const { rows } = await client.query(`SELECT * FROM routines`)
    return rows
  } catch (err) {
    console.log(err.message)
  }
}

const createRoutines = async (routinePublic, routineGoal) => {
  try {
    await client.query(`
    INSERT INTO routines (is_public, goal)
    VALUES (${routinePublic}, '${routineGoal}');
  `)
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = {
  getRoutines,
  createRoutines,
}
