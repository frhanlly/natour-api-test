const app = require('./app')

require('dotenv').config({path: `${__dirname}/config.env`})
#teste
const port = process.env.PORT || 80
#add a comment in git repo (local)
#add a comment in git repo (github)
app.listen(port, err => {
    if(err){
        console.log('Couldnt start listening port on ${port}')
    }else{
        console.log(`Server up listening to the ${port} port`)
    }
})
