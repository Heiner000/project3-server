const express = require('express')
const router = express.Router()
// multipart form data packages
const multer = require('multer')
// cloudinary npm package to ma nage uploads
const cloudinary = require('cloudinary').v2
// utility for deleteing files
const { unlinkSync } = require('fs')

// config for multer
const uploads = multer({ dest: 'uploads'})

// GET /upload -- READ all images
router.get('/upload', (req,res) => {
    res.send('get all images')
})

// POST /upload -- CREATE an image
router.post('/upload', uploads.single('image'),  async (req, res) => {
    try {
        // handle upload errors
        if(!req.file) return res.status(400).json({ msg: 'no file uploaded'})

        // upload to cloudinary
        const cloudData = await cloudinary.uploader.upload(req.file.path)
        console.log(cloudData.url)

        // jpg that can be manipulated -- save to the db?
        const cloudImage = `https://res.cloudinary.com/dlzj22j8a/image/upload/v1683568204/${cloudData.public_id}.jpg`
        
        // delete the file so it doesn't clutter up the server folder
        unlinkSync(req.file.path)

        // cloudData.public_id // save to the db

        // send image back
        res.json({ cloudImage})
    } catch(err) {
        console.log(err)
        res.status(503).json({ msg : 'you should look at server error'})
    }
    console.log(req.file)

})

module.exports = router