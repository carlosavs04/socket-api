import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Jugador extends BaseModel {
  public static table = 'jugadores'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nombres: string

  @column()
  public apellidos: string

  @column()
  public equipo: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
