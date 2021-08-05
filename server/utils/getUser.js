import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const getUser = async (authorization) => {
   const bearerLength = 'Bearer '.length
   if (authorization && authorization.length > bearerLength) {
      const token = authorization.slice(bearerLength)
      const { ok, result } = await new Promise((resolve) =>
         jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
            if (err) {
               resolve({
                  ok: false,
                  result: err
               })
            } else {
               resolve({
                  ok: true,
                  result
               })
            }
         })
      )

      if (ok) {
         const user = await User.findById(result._id)
         return user
      } else {
         console.error(result)
         return null
      }
   }

   return null
}

export { getUser }
