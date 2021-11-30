
const express = require('express')

const router = express.Router()

let citas =[]



router.get('/obtenerCita', (request, response)=>{
    response.json(citas)
})

router.post('/enviarCita', (request, response) => {
    const cita ={
        nombre: request.body.nombre,
        mensaje: request.body.mensaje
    }

    citas.push(cita)

    response.json(cita)

})

module.exports = router;