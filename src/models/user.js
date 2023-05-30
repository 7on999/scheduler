import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userSchema = new Schema({
  phone: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not supported. Available varians are male or female'
    }
  }
});

const User = mongoose.model('User', userSchema);
export default User