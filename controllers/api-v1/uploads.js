const express = require('express')
const router = express.Router()
// const upload = require('../../config/multerConfig')
const multer = require('multer')
// const cloudinary = require('../../config/cloudinaryConfig')
const cloudinary = require('cloudinary').v2
// utility for dleteing files
const { unlinkSync } = require('fs')
const uploads = multer({ dest: 'uploads'})
router.get('/upload', (req,res) => {
    res.send('get all images')
})
router.post('/upload', uploads.single('image'),  async (req, res) => {
    // handle upload errors
    try {
        if(!req.file) return res.status(400).json({ msg: 'no file uploaded'})
        // upload to cloudinary
        const cloudData = await cloudinary.uploader.upload(req.file.path)
        console.log(cloudData.url) // original can be saved in database
        // jpg that can be manipulated -- save to the db
        const cloudImage = `https://res.cloudinary.com/dsppfkekl/image/upload/v1683568204/${cloudData.public_id}.jpg`
        unlinkSync(req.file.path)
        res.json({ cloudImage})
        // res.json({ file : req.file})
    } catch(err) {
        console.log(err)
        res.status(503).json({ msg : 'you should look at server error'})
    }
    console.log(req.file)

})
// (res,req,next)
// async
//     try {
//         const result = await cloudinary.uploader.upload(req.file.path, {
//             folder: 'my_folder'
//         })

//         // delete the local file after uploading to cloudinary
//         if (req.file) {
//             const fs = require('fs')
//             fs.unlinkSync(req.file.path)
//         }

//         console.log(req.file)
//         res.json({ url: result.secure_url })
//     } catch (err) {
//         next(err)
//     }
// })

module.exports = router