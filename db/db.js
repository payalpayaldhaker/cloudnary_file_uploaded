const mongoose =require('mongoose');
 mongoose.connect(`mongodb+srv://${process.env.USER_PASS}:${process.env.USER_NAME}${process.env.DBNAME}.9dohe.mongodb.net/?retryWrites=true&w=majority`)
  .then(()=>{ 
    console.log('success');
  })
  .catch((error)=>{ 
  console.log(error);
  })
  module.exports ={mongoose}