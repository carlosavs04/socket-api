import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Consola from 'App/Models/Consola'
import Event from '@ioc:Adonis/Core/Event'
import { Readable } from 'stream'


export default class ConsolasController {
  public async createConsola({request,response}:HttpContextContract){
    await request.validate({
      schema: schema.create({
        nombre: schema.string([
          rules.maxLength(20),
        ])
      }),
      messages: {
        required: 'El campo {{ field }} es obligatorio.',
        maxLength: 'El campo {{ field }} debe tener un máximo de {{ options.maxLength }} caracteres.',
        string: 'El campo {{ field }} debe ser una cadena de caracteres.',
      }
    })
    
    const consola = await Consola.create({
      nombre: request.input('nombre'),
    })

    Event.emit('new:consola', { id: consola.id })
    
    return response.created({
      'status': 201,
      'mensaje': 'Los datos fueron almacenados correctamente.',
      'error': [],
      'data': consola
    })
  }

  public async getConsolas(){
    const consolas = await Consola.query().select('*')

    return consolas
  }

  public async onNewConsola({ response }: HttpContextContract) {
    const stream = new Readable()

    const consolas = await Consola.query().select('*')
    const data = {
      'mensaje': 'Nueva consola creada.',
      'data': consolas
    }
       
    stream._read = () => {}
    const sendEvent = async () => {
       stream.push(`data: ${JSON.stringify(data)}\n\n`)
      }

      const interval = setInterval(sendEvent, 5000)
      stream.on('close', () => {
        clearInterval(interval)
        stream.destroy()
      })

      response.header('Content-Type', 'text/event-stream')
      response.header('Cache-Control', 'no-cache')
      response.header('Connection', 'keep-alive')

      stream.pipe(response.response)
      return response.response
  }
}
