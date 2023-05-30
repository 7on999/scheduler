import { Router } from "express"

import AppointmentController from "./appointment.controller.js"

class AppointmentRoute {
  router = Router()
  appointmentController = new AppointmentController()

  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.get("/", this.appointmentController.getList)
    this.router.get("/:appointmentId", this.appointmentController.get)
    this.router.post("/", this.appointmentController.createAppoinment)
  }
}

export default new AppointmentRoute().router
