import mongoose from 'mongoose'
import dayjs from "dayjs"

import { regExpDate } from '../global.js';

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    doctor_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Doctor',
      required: true
    },
    slot: {
      type: Date,
      required: true,
      validate: {
        validator: function(v) {
          const formatedTime = dayjs(v).format("YYYY-MM-DD HH:mm")
          return regExpDate.test(formatedTime);
        },
        message: props => `${props.value} не валидная дата! Используйте формат YYYY-MM-DD HH:mm!`
      },
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment