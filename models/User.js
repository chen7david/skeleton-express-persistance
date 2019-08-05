const BaseModel = require('./BaseModel')
const crypto = require('crypto')
const bcrypt = require('bcrypt')

class User extends BaseModel {

    async $beforeInsert() {
        this.userId = 'US' + await crypto.randomBytes(5).toString('hex').toUpperCase()
        this.password = await bcrypt.hash(this.password,10)
    }

    async $beforeUpdate(){
    // SET EMAIL VERIFIED TO NULL WHEN EMAIL IS UPDATED
       if(this.email){
            this.emailVerified = null
       }
    // SET PHONE-NUMBER VERIFIED TO NULL WHEN EMAIL IS UPDATED   
       if(this.phoneNumber){
            this.phoneNumberVerified = null
       }
    }

    async verifyPassword(password){
        return await bcrypt.compare(password, this.password)    
    }

    static get relationMappings(){ 

        const Config = require('./Config')

        return {
            app:{
                relation: BaseModel.HasManyRelation,
                modelClass: Config,
                join:{
                    from:'users.id',
                    to:'configs.user_id'
                }
            }
        }
    }
}

module.exports = User