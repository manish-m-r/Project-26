const mongoose = require('mongoose');
const master = new mongoose.Schema({
    refereeNumber: {
    type: Number
  },
  coachNumber: {
    type: Number
  }
});

mastertable = mongoose.model('master', master);
        
module.exports={
     
     fetchData:function(callback){
        var masterdata=mastertable.find({});
        userData.exec(function(err, data){
            if(err) throw err;
            console.log("err");
            return callback(data);
        })
        
     }
}