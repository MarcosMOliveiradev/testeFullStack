import { randomUUID } from 'node:crypto'
import { Replace } from '../../helpers/Replace'

interface IUser {
  name: string
  email: string
  password: string
  create_at: Date
  update_at?: Date | null
}

export class Users {
  private _id: string
  private props: IUser

  constructor(props: Replace<IUser, { create_at?: Date }>) {
    this._id = randomUUID()
    this.props = {
      ...props,
      create_at: props.create_at ?? new Date(),
    }
  }

  public get id() {
    return this._id
  }

  public set name(name: string) {
    this.props.name = name
  }

  public get name() {
    return this.props.name
  }

  public set email(email: string) {
    this.props.email = email
  }

  public get email() {
    return this.props.email
  }

  public set password(password: string) {
    this.props.password = password
  }

  public get password() {
    return this.props.password
  }

  public set update(update: Date | null | undefined) {
    this.props.update_at = update
  }

  public get update(): Date | null | undefined {
    return this.props.update_at
  }

  public get created(): Date {
    return this.props.create_at
  }
}
