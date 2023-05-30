import Doctor from '../../models/doctor.js'

class DoctorService {

  async getDoctor(doctorId)  {
   return await Doctor.findById(doctorId)
  }

  async getList(){
    return Doctor.find()
  }

  async createDoctor(payload) {
    try {
      const doctor = new Doctor(payload);
      const response = await doctor.save()   

      if (!response) return {success:false}

      return {success:true, doctor:response}

    } catch (e) {
      console.log('e:', e.message)
      return {success:false, error:e.message}
    }
  }

  async delete(doctorId){
    try {
      const response = await Doctor.findByIdAndDelete(doctorId)
      return !!response
    } catch(e){
      return null
    }
  }
}

export default DoctorService