const bcrypt = require('bcryptjs')

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body

      for(let i = 0; i < users.length; i++){
        if (users[i].username === username){
          const existing = bcrypt.compareSync(password, users[i].passwordHash)
          if (existing){
            let messageToUser = {...users[i]}
            delete messageToUser.passwordHash 
            res.status(200).send(messageToUser)
          }
        }    
      }
      res.status(400).send("User not found.")
    },


    
    register: (req, res) => {
        const {username, email, firstName, lastName, password} = req.body
        console.log(req.body)
      
        const salt = bcrypt.genSaltSync(5)
        const passwordHash = bcrypt.hashSync(password, salt)
        console.log(salt)
        console.log(password, passwordHash)

        const newRegister = {
          username, 
          email,
          firstName,
          lastName,
          passwordHash
        } 
        console.log(newRegister)
        
        users.push(newRegister)
        let messageToUser = {...newRegister}
        delete messageToUser.passwordHash
        res.status(200).send(messageToUser)
        console.log(messageToUser)
    }
}