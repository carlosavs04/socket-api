import type { EventsList } from '@ioc:Adonis/Core/Event'

export default class ConsolaListener {
  public async onNewConsola(consola: EventsList['new:consola']) {
    console.log('New consola created with id: ' + consola.id)
  }
}
