const { User } = require('../models')
const { JWT_REGEX, ACCESS_TOKEN_KEY } =require('./../config')
const JWT = require('jsonwebtoken')

const loadHeader = {

}

const loadParam = {

    userId: async (req, res, next, userIdParam) => {
        try{
            const user = await User.query().where('userId',userIdParam).first()

            if(!user)
                throw({ status:422, code:'INVALIDUSERID' })
            
            if(!req.this) {req.this = {}}
            req.this['user'] = user
            next()

        }catch(err){
            next(err)
        }
    }
}

const loadBody = {
    username: async (req, res, next) => {
        
        try{
            const { username } =  req.this.body
            const app = req.self.app || req.this.app

            const user = await User.query()
                .where('username',username).eager('roles')
                .andWhere('app_id', app.id)
                .orWhere('email',username)
                .andWhere('app_id', app.id)
                .orWhere('phoneNumber',username)
                .andWhere('app_id', app.id)
                .first()

            if(!user)
                throw({
                    isJoi:true, 
                    details:[ { 
                        context:{ key:'username' }, 
                        type:'USERNAMENOTFOUND'
                    } ] 
                })
            
            if(!req.this) {req.this = {}}
            req.this['user'] = user
            next()

        }catch(err){
            next(err)
        }
    }
}

module.exports = { loadHeader, loadParam, loadBody }