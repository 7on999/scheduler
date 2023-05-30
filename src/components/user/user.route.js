import { Router } from "express"

import UserController from "./user.controller.js"

class UserRoute {
  router = Router()
  userController = new UserController()

  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.get("/", this.userController.getList)
    this.router.get("/:userId", this.userController.get)
    this.router.post("/", this.userController.create)
    this.router.delete("/:userId", this.userController.delete)
  }
}

export default new UserRoute().router
