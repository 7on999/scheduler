import { Router } from "express"

import DoctorController from "./doctor.controller.js"

class UserRoute {
  router = Router()
  userController = new DoctorController()

  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.get("/", this.userController.getList)
    this.router.get("/:doctorId", this.userController.get)
    this.router.post("/", this.userController.create)
    this.router.delete("/:doctorId", this.userController.delete)
  }
}

export default new UserRoute().router
