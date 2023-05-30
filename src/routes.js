import { Router } from "express"

import user from "./components/user/user.route.js"
import doctor from "./components/doctor/doctor.route.js"
import appointment from "./components/appointment/appointment.route.js"

class Route {
  
  router = Router()

  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.use("/users", user)
    this.router.use("/doctors", doctor)
    this.router.use("/appointments", appointment)

  }
}

export default new Route().router
