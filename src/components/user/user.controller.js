import BaseController from '../../controller.base.js'
import UserService from './user.service.js'

class UserController extends BaseController {

    userService = new UserService()

    get = async (req, res) => {
      const userId = req.params.userId

      if (!this.isValidObjectId(userId)) return this.httpError(res, 'Не валидный userId')

      try{
        const response = await this.userService.getUser(userId)

        if (!response) return this.httpError(res, "User not found")

        return res.json({user:response})

      } catch(e){
        console.log('error:', e)
      }
    }

    getList = async (_, res ) => {
      const response = await this.userService.getList()
      if (!response) return this.httpError(res, "User list not found")
  
      return res.json({ users: response })
    }

    create = async (req, res) =>{

      const allowSymbolsForPhoneNumber = ['1', '2', '3', '4', '5','6','7','8','9','0', '(', ')','-', '+']
      const {phone, age, gender, name} = req.body

      if (phone.split('').some(symbol=>!allowSymbolsForPhoneNumber.includes(symbol))) {
        return this.httpError(res, 'Недопустимое значение номера телефона. Разрешены только цифры, знаки: (), -, + ')
      }

      const isExistUserWithPhone = await this.userService.checkPhone(phone)
      
      if (isExistUserWithPhone) return this.httpError(res, 'Данный номер телефона уже используется')

      try {
        const response = await this.userService.createUser({phone, age, gender, name})

        if (!response?.success) return this.httpError(res, response.error)
        if (!response?.user?.id) return this.httpError(res, 'не удалось зарегистрировать пользователя')

        return res.status(201).json({user:response.user})
      } catch(error){
        console.log('error from controller user:', error)
        res.status(500).json({ error });
      }
    }

    delete = async (req, res) => {
      const userId = req.params.userId

      if (!this.isValidObjectId(userId)) return this.httpError(res, 'Не валидный userId')


      try {
        const response = await this.userService.delete(userId)

        if (response) {
          return res.json({ success: true })
        } else this.httpError(res, "User not found")

      } catch(error){
        return res.json({ error });
      }
    }
}

export default UserController
