import type { EventsList } from '@ioc:Adonis/Core/Event'
import Env from '@ioc:Adonis/Core/Env'

export default class Consola {
  public async onNewConsola(consola: EventsList['new:consola']) {
    console.log('New consola created with id: ' + consola.id)
    Env.set('EVENT_LISTENER', 'true')
  }
}
