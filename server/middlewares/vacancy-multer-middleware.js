const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const path = require('path')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/images/')
    },
    filename(req, file, cb) {
        const uuid = uuidv4()
        const ext = path.extname(file.originalname)
        cb(null, `vacancy_${uuid}${ext}`)
    },
})

const types = [
    'image/png',
    'image/jpeg',
    'image/bmp',
    'image/tiff',
]

const fileFilter = (req, file, cb) => {

    if (types.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({ storage, fileFilter })
