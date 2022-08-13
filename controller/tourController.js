const fs = require('fs')
const { cloneDeep} = require('lodash')

let toursOBJ = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`, {encoding: 'utf-8'}))

const createTour = (req, res) => {
    const newId = toursOBJ[toursOBJ.length - 1].id + 1
    const newTour = Object.assign({newId}, req.body)

    toursOBJ.push(newTour)
    fs.writeFile(`${__dirname}/data/tours.json`, JSON.stringify(toursOBJ), {
        encoding: 'utf-8'
    }, err => {
        if(err){
            toursOBJ.pop()
            res.status(500).json({
                message: 'Wasn\'t possible to POST your data on the DATABASE!'
            })
        }else{
            res.status(200).json({
                message: 'Your data was POST on the DATABASE!',
                newTour
            })
            
        }
    })
}

const updateTourById = (req, res) => {
    const id = req.params.id
    const updateProperties = req.body

    const found = toursOBJ.find(tour => tour.id.toString() === id)

    // this copy is needed due to the possibility of failure while trying to write to the file that works as a fake DATABASE
    const oldFound = cloneDeep(found)
    if(found){
        const patchTour = Object.assign(found, updateProperties)
        fs.writeFile(`${__dirname}/data/tours.json`, JSON.stringify(toursOBJ), {encoding: 'utf-8'}, err => {
            if(err){
               Object.assign(found, oldFound)
               res.status(500).json({
                status: 'failed',
                message: 'can\'t save data on database'
                })

            }else{
                res.status(200).json({
                    status: 'success',
                    message: 'tour updated successfully',
                    tour: patchTour
                })
            }
        } )
    }else{
        res.status(400).json({
            status: 'failed',
            message: 'couldn\'t find tour by the id on database'
        })
    }
}

const getAllTours = (req, res) => {
    res.status(200).json(toursOBJ)
}

const getTourById = (req, res) => {
    const id = req.params.id
    
    const found = toursOBJ.find(tour => tour.id.toString() === id)
    
    if(found){
        res.status(200).json({
            status: 'success',
            message: 'tour by id found',
            tour: found
        })
    }else{
        res.status(404).json({
            status: 'failed',
            message: 'tour by id not found'
        })
    }
}

const deleteTourById = (req, res) => {
    const id = req.params.id

    const foundIndex = toursOBJ.findIndex(tour => tour.id.toString() === id)
    const found = toursOBJ[foundIndex]
    if(found !== -1){
        toursOBJ.splice(foundIndex, 1)

        fs.writeFile(`${__dirname}/data/tours.json`, toursOBJ, {encoding: 'utf-8'}, err => {
            if(err){
                toursOBJ.splice(foundIndex, 1, found)

                res.status(500).json({
                    status: 'failed',
                    message: 'couldn\'t delete the tour by id'
                })
            }else{
                res.status(200).json({
                    status: 'success',
                    message: 'tour successfully deleted',
                    tour: found
                })
            }
        })
    }else{
        res.status(400).json({
            status: 'failed',
            message: 'the given id for a tour doesn\'t exist'
        })
    }

}

const checkBody = (req, res, next) => {
    if(req.body && req.body.name && req.body.price ){
        next()
    }else{
        res.status(400).json({
            status: 'failed',
            message: 'bad request'
        })
    }


}   

module.exports = {
    createTour,
    updateTourById,
    getAllTours,
    getTourById,
    deleteTourById,
    checkBody
}