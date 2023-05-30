import httpStatus from "http-status"
import {Types} from 'mongoose'

const ObjectId = Types.ObjectId

class BaseController {

  httpError = (
    res,
    message,
    code = httpStatus.NOT_FOUND,
    error = null
  ) => {
    return res.status(code).json({ success: false, message, ...(error && { error }) })
  }

  isValidObjectId(id){
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;       
        return false;
    }
    return false;
  }
}

export default BaseController
