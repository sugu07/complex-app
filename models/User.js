const bcrypt = require("bcryptjs")
const validator = require("validator")
const usersCollection = require('../db').db().collection("users")
let User = function(data){
    this.data = data
    this.errors = []
}
User.prototype.cleanUp = function(){
    if(typeof(this.data.username)!= "string"){this.data.username = ""}
    if(typeof(this.data.email)!= "string"){this.data.email = ""}
    if(typeof(this.data.password)!= "string"){this.data.password = ""}

    // get rid of any property sent from hacker
    this.data = {
        username: this.data.username.trim(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password
    }
}

User.prototype.validate = function(){
    return new Promise(async (resolve,reject)=>{
        if(this.data.username == ""){
            this.errors.push("Username cannot be empty")
        }
        // if(this.data.email == ""){
        //     this.errors.push("You must provide a valid email")
        // }
        if(this.data.password == ""){
            this.errors.push("Password cannot be empty")
        }
        if(this.data.password.length >0 && this.data.password.length< 8){
            this.errors.push("Password must be at least 8 char")
        }
        if(this.data.password.length > 10){
            this.errors.push("Password cannot exceed 10 Char")
        }
        if(this.data.username.length >0 && this.data.username.length< 3){
            this.errors.push("Password must be at least 3 char")
        }
        if(this.data.username.length > 10){
            this.errors.push("Password cannot exceed 10 Char")
        }
        if(!validator.isEmail(this.data.email)){
            this.errors.push("You must provide a valid email")
        }
        if(this.data.username != "" && !validator.isAlphanumeric(this.data.username)){
            this.errors.push("You must provide a valid Alpha Numeric username")
        }
    
        //Check for existing user
        if(this.data.username.length > 2 && this.data.username.length < 31 && validator.isAlphanumeric(this.data.username)){
            let usernameExists = await usersCollection.findOne({username: this.data.username})
            if(usernameExists){this.errors.push("Username is already taken")}
        }
    
        //Check for existing email
        if(validator.isEmail(this.data.email)){
            let emailExists = await usersCollection.findOne({email: this.data.email})
            if(emailExists){this.errors.push("Email is already taken")}
        }

        resolve()
    })
}

User.prototype.register = function(){
    return new Promise( async (resolve, reject) => {
        // Step #1: Vlidate user data
        this.cleanUp()
        await this.validate()
    
        // Step #2: Only if there are no validations erros then save the user data into a database
        if(!this.errors.length){
            // Hashing user password
            let salt = bcrypt.genSaltSync(10)
            this.data.password = bcrypt.hashSync(this.data.password,salt)
            await usersCollection.insertOne(this.data)
            resolve()
        }
        else{
            reject(this.errors)
        }
    
    })
}

User.prototype.login = function() {
    return new Promise((resolve, reject) => {
        this.cleanUp()
        usersCollection.findOne({username: this.data.username}).then((userCount) => {
            // userCount.password == this.data.password
            if(userCount && bcrypt.compareSync(this.data.password, userCount.password)){
                // callback("s")
                resolve("Success!! Valid Login")
            }
            else{
                // callback("n")
                reject("Ooppssss!!! Invalid Credentials")
            }
        }).catch(function(){
            reject("Please trying again later")
        })
    })
}

module.exports = User