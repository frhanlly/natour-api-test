const app = require('./app')

require('dotenv').config({path: `${__dirname}/config.env`})

const port = process.env.PORT || 80
#add a comment in git repo (github)
app.listen(port, err => {
    if(err){
        console.log('Something went wrong with the server...')
    }else{
        console.log(`Server up listening to the ${port} port`)
    }
})
