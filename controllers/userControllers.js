const fs = require('fs')
const path = require('path')
const user = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/user.json'), 'utf-8'))
const bcrytjs = require('bcryptjs')

const Users = {
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
            id: Users.generateId(),
            ...req.body,
            password: bcrytjs.hashSync(req.body.password, 10)
        }
        user.push(newUser)
        fs.writeFileSync(path.join(__dirname, '../data/user.json'), JSON.stringify(user, null, " "))
        res.send('se guardó')
    },
    getEdit: (req, res) => {
        let id = req.params.id
        let userToEdit = user.filter(x => x.id == id)
        res.render('editUser', { "user": userToEdit}) 
    },
    edit: (req, res) => {
        // let allUsers = user
        let modifyUser = user.map( x => {if(x.email == req.body.email){
            x = {
                id: x.id,
                ...req.body,
                password: bcrytjs.hashSync(req.body.password, 10)
            } 
            return x
        } return x 
        })    
        fs.writeFileSync(path.join(__dirname, '../data/user.json'), JSON.stringify(modifyUser, null, " "))
        res.send('Usuario modificado con éxito!')
    },
    getDelete: (req, res) =>{
        id = req.params.id
        let userExports = user.filter(usuario => usuario.id == id)
        res.render('deleteUser', { "user": userExports})
    },
    delete: (req, res) =>{
        let userMail = req.body.email //necesita validación para ser eficiente
        let newUsers = user.filter(x => x.email != userMail)
        fs.writeFileSync(path.join(__dirname, '../data/user.json'), JSON.stringify(newUsers, null, " "))
        console.log(newUsers)
        res.send('Usuario ' + userMail + ' eliminado con éxito')
    }


}

module.exports =  Users