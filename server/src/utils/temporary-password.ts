import * as crypto from 'node:crypto'

export const createTemporaryPassword = (): string =>
  crypto.randomBytes(8).toString('hex')
