import dayjs from "dayjs"
import httpStatus from "http-status"

import { regExpDate } from '../../global.js'

import UserService from '../user/user.service.js'
import DoctorService from  '../doctor/doctor.service.js'
import AppointmentService  from './appointment.service.js'

import BaseController from "../../controller.base.js"

class AppointmentController extends BaseController {

    appointmentService = new AppointmentService()
    doctorService = new DoctorService()
    userService = new UserService()

    get = async (req, res) => {
      const appointmentId = req.params.appointmentId

      if (!this.isValidObjectId(appointmentId)) return this.httpError(res, 'Не валидный appointmentId')

      try {
        const response = await this.appointmentService.getAppointment(appointmentId)

        if (!response) return this.httpError(res, "Appointment not found")

        return res.json({appointment:response})

      } catch(e){
        console.log('error:', e)
      }
    }

    getList = async (_, res ) => {
      const response = await this.appointmentService.getList()
      if (!response) return this.httpError(res, "Appointment list not found")
  
      return res.json({ appointments: response })
    }


    createAppoinment = async (req, res) =>{
      const {user_id:userId, doctor_id: doctorId, slot } = req.body
      console.log('slot:', slot)


      if (!this.isValidObjectId(userId)) return this.httpError(res, 'Не валидный userId')
      if (!this.isValidObjectId(doctorId)) return this.httpError(res, 'Не валидный doctorId')
     
      if (!Boolean(slot.match(regExpDate))){
        return this.httpError(res, `Введеное вами время "${slot}" некоректно. Используйте следующий формат: YYYY-MM-DD HH:mm`)
      }

      if (dayjs(slot).isBefore(dayjs())){
        return this.httpError(res, `Невозможно назначить прием к врачу на прошедшую дату!. "${slot}" уже прошло!`)
      }
      
      try {
        const doctor = await this.doctorService.getDoctor(doctorId)
        if (!doctor) {
          throw new Error('Doctor not found!');
        }

        if (!doctor.slots.length){
          throw new Error('Doctor has not free windows');
        }
0
        const user = await this.userService.getUser(userId);
        if (!user) {
          throw new Error('User not found!');
        }

        const availableDoctorRecords = doctor.slots.map(slot=> dayjs(new Date(slot)).format("YYYY-MM-DD HH:mm"))
        if (!availableDoctorRecords.includes(slot)) throw new Error(`Врач не ведет прием в это время: ${slot}. Доступные окна приема: ${availableDoctorRecords}`);
  
        doctor.slots.pull(slot)
        doctor.save()
        const response = await this.appointmentService.createAppointment({user_id:userId, doctor_id:doctorId, slot})

        this.appointmentService.createNotifocations({ user, doctor, slot})

        return res.status(201).json(response)
      } catch(error){
        console.log('error from controller create appointment:', error.message)
        return this.httpError(res, "Не удалось записаться на прием", httpStatus.NOT_ACCEPTABLE, error.message)
      }      
    }
}

export default AppointmentController
