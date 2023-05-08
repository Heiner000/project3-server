const express = require('express')
const router = express.Router()
const upload = require('../../config/multerConfig')
const cloudinary = require('../../config/cloudinaryConfig')
router.get('/upload', (req,res) => {
    res.send('get all images')
})
router.post('/upload', upload.single('image'), async (req, res, next) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'my_folder'
        })

        // delete the local file after uploading to cloudinary
        if (req.file) {
            const fs = require('fs')
            fs.unlinkSync(req.file.path)
        }

        res.json({ url: result.secure_url })

    } catch (err) {
        next(err)
    }
})

module.exports = router