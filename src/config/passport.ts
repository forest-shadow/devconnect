import mongoose from 'mongoose'
import { JwtFromRequestFunction, VerifiedCallback } from 'passport-jwt'

const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt

const User = mongoose.model('user')


interface JwtStrategyOptions {
  jwtFromRequest: JwtFromRequestFunction,
  secretOrKey: string
}

const options: JwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}

export default (passport: any) => {
  passport.use(new JwtStrategy(options, (jwtPayload: any, done: VerifiedCallback) => {
    User.findById(jwtPayload.id)
      .then(user => {
        if (user) {
          return done(undefined, user)
        }
        return done(undefined, false)
      })
      .catch(error => console.log(error))
  }))
}
