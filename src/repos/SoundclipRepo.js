import { BaseRepo } from './BaseRepo'

export class SoundclipRepo extends BaseRepo {
  constructor () {
    super('soundclips', 'soundclipId')
  }
}
