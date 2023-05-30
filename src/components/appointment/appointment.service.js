import dayjs from 'dayjs'
import schedule from 'node-schedule';

import Appointment from '../../models/appoinment.js';
import logger from '../../utils/logger.js'

class AppointmentService {

    async getAppointment(userId)  {
      return await Appointment.findById(userId)
    }

    async getList(){
      return Appointment.find()
    }

    async createAppointment(body) {
      
      const appoinment = new Appointment(body);
      const response = await appoinment.save()

      return response
    }

    async createNotifocations({user, doctor, slot} ){
      const currentDate = new Date()
      const goalDay = new Date(slot)

      const dayBefore = new Date(goalDay)
      dayBefore.setDate(goalDay.getDate() - 1)

      const twoHourBefore = new Date(goalDay)
      twoHourBefore.setHours(goalDay.getHours() - 2)

      if (currentDate<twoHourBefore){

        const timeAppointment = slot.split(' ')[1]

        const notificationTwoHourBefore = schedule.scheduleJob(twoHourBefore, function() {       
          logger.info(`  ${ dayjs(new Date()).format("YYYY-MM-DD HH:mm")} | Привет ${user.name}!  Вам через 2 часа к ${doctor.spec} в ${timeAppointment}  `)
        });

        if (currentDate<dayBefore) {

          const notificationDayBefore = schedule.scheduleJob(dayBefore, function() {       
            logger.info(`  ${ dayjs(new Date()).format("YYYY-MM-DD HH:mm")} | Привет ${user.name}!  Напоминаем что вы записаны к доктору ${doctor.spec} завтра в: ${timeAppointment}  `)
          });
        }
      }
    }
}

export default AppointmentService