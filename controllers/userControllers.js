const fs = require('fs')
const path = require('path')
const user = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/user.json'), 'utf-8'))
const bcrytjs = require('bcryptjs')

const userControllers = {
    getRegister: (req, res) =>{
        res.render('register')
    },
    generateId: () => {
        const allUsers  = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/user.json'), 'utf-8'))
        
        if( allUsers.length < 1){ return 1 } else { let nuevoId = allUsers.pop(); 
            return nuevoId.id + 1 } 
    },
    register: (req, res) => {
        let newUser = {
            id: userControllers.generateId(),
            ...req.body, 
            password: bcrytjs.hashSync(req.body.password, 10)
        }
        user.push(newUser)
        fs.writeFileSync(path.join(__dirname, '../data/user.json'), JSON.stringify(user, null, " "))
        res.send('se guardó')
    }


}

module.exports =  userControllers