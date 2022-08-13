const fs = require('fs')

let usersOBJ = {}

const getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'successfully obtained all users',
        users: usersOBJ
    })
}

const createUser = (req, res) => {
    const newId = usersOBJ[usersOBJ.length - 1].id + 1
    const newUser = Object.assign({id: newId}, req.body)

    usersOBJ.push(newUser)
    fs.writeFile(`${__dirname}/data/tours.json`, JSON.stringify(usersOBJ), err => {
        if(err){
            usersOBJ.pop()
            res.status(500).json({
                status: 'failed',
                message: 'failed to add new user'
            })
        }else{
            res.status(200).json({
                status: 'success',
                message: 'successfully added new user',
                user: newUser
            })
        }
    })
}

module.exports = {
    getAllUsers,
    createUser
}