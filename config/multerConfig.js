const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        // cb(null, file.organization)
        const timestamp = Date.now()
        cb(null, `${timestamp}-${file.originalname}`)
    }
})

const upload = multer({ storage })

module.exports = upload