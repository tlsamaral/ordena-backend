import crypto from 'node:crypto'
import multer from 'multer'

import { extname, resolve } from 'node:path'

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (req, file, cb) => {
          const fileHash = crypto.randomBytes(10).toString('hex')
          const fileName = `${fileHash}-${file.originalname}`

          return cb(null, fileName)
        },
      }),
    }
  },
}
