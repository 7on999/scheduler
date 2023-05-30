import User from '../../models/user.js'

class UserService {

  async getUser(userId)  {
    const user = await User.findById(userId)
    return user
  }

  async getList(){
    return User.find()
  }

  async createUser(payload) {
    try {
      const user = new User(payload);
      const response = await user.save()   

      if (!response) return {success:false}

      return {success:true, user:response}

    } catch (e) {
      console.log('e:', e.message)
      return {success:false, error:e.message}
    }
  }

  async delete(userId){
    try {
      const response = await User.findByIdAndDelete(userId)
      console.log('response from user service delete:', response)
      return !!response
    } catch(e){
      return null
    }
  }

  async checkPhone(phone){
    const user = await User.findOne({phone})
    return !!user?.id
  }
}

export default UserService