import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Jugador from 'App/Models/Jugador'

export default class JugadorController {
    public async create({ request, response }: HttpContextContract) {
        await request.validate({
            schema: schema.create({
                nombres: schema.string([
                    rules.maxLength(40),
                ]),
                apellidos: schema.string([
                    rules.maxLength(40),
                ]),
                equipo: schema.string([
                    rules.maxLength(20),
                ]),
            }),
            messages: {
                required: 'El campo {{ field }} es obligatorio.',
                maxLength: 'El campo {{ field }} debe tener un máximo de {{ options.maxLength }} caracteres.',
                string: 'El campo {{ field }} debe ser una cadena de caracteres.',
            }
        })

        const jugador = await Jugador.create({
            nombres: request.input('nombres'),
            apellidos: request.input('apellidos'),
            equipo: request.input('equipo'),
        })

        return response.created({
            'status': 201,
            'mensaje': 'Los datos fueron almacenados correctamente.',
            'error': [],
            'data': jugador,
        })
    }

    public async allJugadores() {
        const jugadores = Jugador.query().select('*')

        return jugadores
    }
}
