// implement your API here
const express = require('express') 

const Db = require('./data/db')


const server = express()

server.use(express.json())

// endpoints 

//GET 

server.get('/api/users', (req, res) => {
    Db.find()
    .then( users => {
        res.status(200).json(users)
    })
    .catch( error => {
        res.status(500).json({ errorMessage: " sorry we ran into an error getting the list of users"})
    })
})

// POST USER 

server.post('/api/users', ( req, res) => {
    const userData = req.body

   const {name, bio } = userData

   if(!name || !bio){
       res.status(400).json({ errorMessage: "Please provide name and bio for the user"})
   }

  Db.insert(userData)
  .then( user => {
      res.status(201).json(user)

  })
 .catch( error => {
     res.status(500).json({error: "There was an error while saving the user to the datanase"})
 })
})

// GET USER BY ID 

server.get('/api/users/:id', (req, res) => {
   const userId = req.params.id
  const userData = req.body


  

  
   Db.findById(userId)
  
   .then( result => {
       
       if(!result) {
        res.status(404).json({error: "Specified id does not exist"})
    } else {
        res.status(201).json(result)
    }
   })
   .catch( error => {
       res.status(500).json({
           errorMessage: " sorry user id not found"
       })
   })
})

// DELETE USER 

server.delete('/api/users/:id' , (req, res) => {
    const id = req.params.id
    
    Db.remove(id)
    .then(result => {
        if(!result) {
            res.status(404).json({error: "Specified id does not exist"})
        } else {
            res.status(201).json(4)
        }
        
    })
    .catch(error => {
        res.status(500).json({
            errorMessage: "Something went wrong, when removing user"
        })
    })
})



// UPDATE(PUT) USER

server.put('/api/users/:id', (req, res) => {
    const id =req.params.id
    const userData = req.body

 const { name, bio } = userData 

 if( !name || !bio) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user"})
 }

Db.update(id, userData)
.then( user => {
    user ? 
    res.status(200).json({user}) : 
    res.status(404).json({errorMessage: "Specified id does not work"})
})
.catch( error => {
    status(500).json({error: "Something is wrong with server, sorry."})
})





})
 

const port = 7000;

server.listen(port, () => console.log(`\n ** api on port : ${port} ** \n`))
