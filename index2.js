const express = require('express')
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { uuid } = require('uuidv4');
const app = express();
const multer = require('multer');
const path = require('path');

require('dotenv').config();

 cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key:process.env.CLOUD_API_KEY , 
    api_secret:process.env.CLOUD_API_SECRET 
  });
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.log(file);
      
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        let randomnumber =uuid();
       let filename = randomnumber+''+file.originalname
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage })
  
 const {mongoose} = require('./db/db');
 
      let Data1 = mongoose.model('mycludnary',
      {
        asset_id: String,
        public_id: String,
        version: Number,
        version_id:String,
        signature: String,
        width: Number,
        height: Number,
        format: String,
        resource_type:String,
        created_at: String,
        tags: [],
        bytes: Number,
        type: String,
        etag: String,
        placeholder: Boolean,
        url: String,
        secure_url: String,
        original_filename: String,
        original_extension:String,
        api_key:Number 
      
      })
      app.post('/profile', upload.single('myfile'),(req,res)=>{ 
        //console.log(req.file.path);
        //cloudnarry
        cloudinary.uploader.upload(req.file.path, async function(error, result) {
          console.log(result, error);
           fs.unlink(req.file.path, function(err){
               if (err) console.log(err);
               else console.log("File Deleted successfully");
           })
           let data2 = await new Data1(result);
           let data3 = await data2.save();
           console.log(data3)
           res.json({
                    "data":data3
           });
        });
              
        })
     
   
   





let port = process.env.PORT
app.listen(port,()=>{
    console.log(`server on run ${port}`);
})