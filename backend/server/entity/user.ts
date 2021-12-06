import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('user')
export class User {
  @PrimaryColumn('uuid', { unique: true })
  uuid!: string

  @Column('text')
  username!: string

  @Column()
  wallet?: number

  @Column('boolean')
  isAdmin!: boolean
}
