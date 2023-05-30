import mongoose from 'mongoose'
import dayjs from "dayjs"

import { regExpDate } from '../global.js';

const Schema = mongoose.Schema;

function validatorSameTime (arraySlots) {
  const uniqueSlots = new Set()

  for ( let slot of arraySlots){

    const currentSlot = String(slot)
    if (uniqueSlots.has(currentSlot)) return false

    uniqueSlots.add(currentSlot) 
  }

  return true
}


const doctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  spec: {
    type: String,
    required: true,
  },
  work_experiance_yars: {
    type: Number,
    required: true,
  },
  slots: [{
    type: Date,
    required: true,
    validate: {
      validator: function(v) {
        const formatedTime = dayjs(v).format("YYYY-MM-DD HH:mm")
        return regExpDate.test(formatedTime);
      },
      message: props => `${props.value} не валидная дата! Используйте формат YYYY-MM-DD HH:mm!`
    },
  }],
});

doctorSchema.path('slots').validate(validatorSameTime, 'Доктор не может иметь несколько приемов в одно время');

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor