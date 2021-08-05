import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema(
   {
      name: String,
      email: String,
      password: String,
      avatar: String
   },
   {
      timestamps: true
   }
)

export default mongoose.model('User', userSchema)
