const express = require("express")
const cors = require("cors")
const { getActivities, createActivities } = require("./backend/activities.jsx")
const { getRoutines, createRoutines } = require("./backend/routines.jsx")
const {
  createActivities_Routines,
} = require("./backend/activities_routines.jsx")

const client = require("./backend/client.cjs")
client.connect()

const app = express()
const PORT = 3000

app.use(cors()) // Enable CORS for all origins

app.use(express.json()) //RAW JSON POST
app.use(express.urlencoded({ extended: true })) // PRETTY JSON POST
app.use(express.static("dist"))

app.get("/", (req, res) => {
  res.sendFile(`${__dirname} dist/index.html`)
})

app.get("/api/v1/activities", async (req, res) => {
  try {
    const activites = await getActivities()
    res.status(200).send(activites)
  } catch (err) {
    console.log(err.message)
  }
})

app.get("/api/v1/routines", async (req, res, next) => {
  try {
    const routines = await getRoutines()
    res.status(200).send(routines)
  } catch (err) {
    next(err.message)
  }
})

app.get("/api/v1/activities/:activityId", async (req, res, next) => {
  try {
    const activityId = req.params.activityId
    const { rows } = await client.query(
      `SELECT * FROM activities WHERE activities_id = ${activityId}`
    )
    res.status(200).send(rows)
  } catch (err) {
    next(err.message)
  }
})

app.get("/api/v1/routines/:routineId", async (req, res, next) => {
  try {
    const routineId = req.params.routineId
    const { rows } = await client.query(
      `SELECT * FROM routines WHERE routines_Id = ${routineId}`
    )
    res.status(200).send(rows)
  } catch (err) {
    next(err.message)
  }
})

app.post("/api/v1/activities", async (req, res, next) => {
  try {
    const { name, description } = req.body
    const newActivity = await createActivities(name, description)
    res.status(200).send(newActivity)
  } catch (err) {
    next(err.message)
  }
})

app.post("/api/v1/routines", async (req, res, next) => {
  try {
    const { is_public, goal } = req.body
    const newRoutine = await createRoutines(is_public, goal)
    res.status(200).send(newRoutine)
  } catch (err) {
    next(err.message)
  }
})

app.post("/api/v1/routines_activities", async (req, res, next) => {
  try {
    const { activitesId, routineId, count } = req.body
    const newActive_Routine = await createActivities_Routines(
      activitesId,
      routineId,
      count
    )
    res.status(200).send(newActive_Routine)
  } catch (err) {
    next(err.message)
  }
})

app.listen(PORT, () => {
  console.log("Listening on port", PORT)
})
