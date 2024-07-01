const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    minlength: 3,
    required: true,
    unique: true // esto asegura la unicidad de usernameString,
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // el passwordHash no debe mostrarse
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)
