register: (req, res) => {
    let errors = validationResult(req)//requiero el error de las validaciones que cree en routes
    if(errors.isEmpty()){
        let userDB = user.filter(users => users.email == req.body.email)
        if(userDB.length < 1){
            let newUser = {//
                id: Users.generateId(),
                ...req.body,
                password: bcrytjs.hashSync(req.body.password, 10)
            }
            user.push(newUser)
            fs.writeFileSync(path.join(__dirname, '../data/user.json'), JSON.stringify(user, null, " "))
            res.send('usuario creado con éxito!')//
        } else {
            let mensaje = "llegue"
            res.render('register', { "err": mensaje })
            res.send('Error! el correo ya se encuentra registrado')
            // let userMsg = "El usuario" + userDB +"ya se encuentra registrado"
            // res.render('register', {userInDb : userMsg})//esta funcion estuvo cerca pero me rompe los errores de arriba
            
        }
    } else {
        res.render('register', { "errors" : errors.array(), "old": req.body})
    }
}

//este es el register que funciona todo pero que no entiendo :S
register: (req, res) => {
    const resultValidation = validationResult(req);
    
    if(resultValidation.errors.length > 0){
        return res.render('register', { errors: resultValidation.mapped(), oldData: req.body});
    } else {
        //validar que no se registre con el mismo mail
        let userInDB = User.findByEmail(req.body.email)
        if(userInDB){
            //anda pero no me muestra el msj
            res.render('userRegister', { errors: {email: { msg: 'El mail ya se encuentra registrado'}}});
        } else {
            let userToCreate = {
                ...req.body,
                password: bcryptjs.hashSync(req.body.password, 10)//esta linea encripta contraseña y pisa la de la linea anterior
            }
            User.create(userToCreate)//Aca uso la forma de crear usuarios declarada en User.js
            res.redirect('/login')
        }
      }
    }