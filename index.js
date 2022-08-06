//import area 
const express = require('express'); 
const mongoose = require('mongoose'); 
const app = express();
require('dotenv').config();
const multer = require('multer');

async function blog(){ 
return await mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}${process.env.DBNAME}.9dohe.mongodb.net/?retryWrites=true&w=majority`)
}
blog().then(()=>{ 
  console.log('connected');
  const storage = multer.diskStorage({
    //methods
      destination: function (req, file, cb) {
        cb(null, './uploads')
      },
      filename: function (req, file, cb) {
        //console.log(file)
        let filename =Math.floor(Math.random() * 100000000) +file.originalname
        cb(null, filename)
      }
    })
    const upload = multer({ storage })
  app.post('/profile',upload.single('myfile'),async(req,res)=>{ 
    //console.log(req.file)
    console.log(req.body);
    let Data = mongoose.model('filecollection',{
      name:String,
      surname:String,
      address:String,
      contact:Number,
      adhar:Number
      
      });
    let data2 = await new Data(req.body)
    let data3 = await data2.save() 
      console.log(data3);
      
      res.json({"data":'ok'});
   
   
     
    })
}).catch((err)=>{ 
console.log(err);
})

let port = process.env.PORT 
app.listen(port,()=>{ 
console.log(`server or run ${port}`)
})
