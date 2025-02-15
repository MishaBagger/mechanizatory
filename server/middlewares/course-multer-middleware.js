const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const path = require('path')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/courses/')
    },
    filename(req, file, cb) {
        const uuid = uuidv4()
        const ext = path.extname(file.originalname)
        cb(null, `course_${uuid}${ext}`)
    },
})

const types = [
    'image/png',
    'image/jpeg',
    'image/bmp',
    'image/tiff',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/vnd.oasis.opendocument.text', // .odt
    'application/rtf', // .rtf
    'application/pdf', // .pdf
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
    'application/vnd.oasis.opendocument.presentation', // .odp
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.oasis.opendocument.spreadsheet', // .ods
    'video/mp4', // .mp4
    'video/quicktime', // .mov
    'video/x-ms-wmv', // .wmi
    'video/x-msvideo', // .avi
    'audio/mpeg', // .mp3
    'audio/wav', // .wav
    'audio/mp4' // .m4a
]

const fileFilter = (req, file, cb) => {

    if (types.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({ storage, fileFilter })
