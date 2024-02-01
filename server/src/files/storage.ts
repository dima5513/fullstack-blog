import multer, { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'

export const fileStorage = () =>
  diskStorage({
    filename: (req, file: Express.Multer.File, callback) => {
      console.log(file.filename)
      callback(null, `${uuidv4()}.${file.originalname.split('.')[1]}`)
    },
    destination: './uploads',
  })
