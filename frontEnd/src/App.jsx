import { useEffect } from "react"
import { useState } from "react"

function App() {
  const [activities, setActivities] = useState([])

  // useEffect(() => {
  //   console.log("moutning")
  //   const fetchActivities = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000//api/v1/activities")
  //       const result = await response.json()
  //       console.log(result)
  //       setActivities(result)
  //     } catch (error) {
  //       console.log(error.message)
  //     }
  //   }
  //   fetchActivities()
  // }, [])

  const fetchActivities = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/activities/")
      const result = await response.json()
      console.log("Player list fetch", result)
    } catch (error) {
      console.log(error.message)
    } finally {
    }
  }
  fetchActivities()
  return (
    <>
      <h1>test</h1>
      {activities && <h1>{activities}</h1>}
    </>
  )
}

export default App
