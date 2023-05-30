import dayjs from "dayjs"

import {regExpDate} from '../../global.js'

import BaseController from '../../controller.base.js'
import DoctorService from './doctor.service.js'

class DoctorController extends BaseController {

    doctorService = new DoctorService()

    get = async (req, res) => {
      const doctorId = req.params.doctorId

      if (!this.isValidObjectId(doctorId)) return this.httpError(res, 'Не валидный doctorId')

      try {
        const response = await this.doctorService.getDoctor(doctorId)

        if (!response) return this.httpError(res, "Doctor not found")

        return res.json({doctor:response})

      } catch(e){
        console.log('error:', e)
      }
    }

    getList = async (_, res ) => {
      const response = await this.doctorService.getList()
      if (!response) return this.httpError(res, "Doctor list not found")
  
      return res.json({ doctors: response })
    }

    create = async (req, res) =>{
      
      const {name, spec, work_experiance_yars, slots} = req.body

      for (const potentialSlot of slots){
        if (!Boolean(potentialSlot.match(regExpDate))){
          return this.httpError(res, `Введеное вами время "${potentialSlot}" некоректно. Используйте следующий формат: YYYY-MM-DD HH:mm`)
        }

        if (dayjs(potentialSlot).isBefore(dayjs())){
          return this.httpError(res, `Невозможно назначить прием к врачу на прошедшую дату!. "${potentialSlot}" уже прошло!`)
        }
      }
     
      try {
        const response = await this.doctorService.createDoctor({name, spec, work_experiance_yars, slots})

        if (!response?.success) return this.httpError(res, response.error)
        if (!response?.doctor?.id) return this.httpError(res, 'не удалось добавить доктора')

        return res.status(201).json({doctor:response.doctor})
      } catch(error){
        console.log('error from controller doctor:', error)
        res.status(500).json({ error });
      }
    }

    delete = async (req, res) => {
      const doctorId = req.params.doctorId

      if (!this.isValidObjectId(doctorId)) return this.httpError(res, 'Не валидный doctorId')

      const response = await this.doctorService.delete(doctorId)
      if (!response) return this.httpError(res, "Doctor not found")
  
      return res.json({ success: true })
    }
  }

export default DoctorController
