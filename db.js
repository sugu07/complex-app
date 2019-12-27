const mongodb = require('mongodb')
const dotenv = require('dotenv')
dotenv.config()

// const connectionString = 'mongodb+srv://todo:Test@1234@cluster0-d9jdo.mongodb.net/ChatRoom?retryWrites=true&w=majority'

mongodb.connect(process.env.CONNECTIONSTRING,{useNewUrlParser: true, useUnifiedTopology: true},function(err, client){
    module.exports = client
    const app = require('./app')
    app.listen(process.env.PORT)
})
