const mongoose = require('mongoose')


// //mongodb://127.0.0.1:27017/challenge_accepted

mongoose.connect('mongodb://admin:admin1234@ds257507.mlab.com:57507/heroku_rtrm41m6', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(()=>{
  console.log('db success')
}).catch((error) => {
    assert.isNotOk(error,'Promise error');
    done();
  });


//lets require/import the mongodb native drivers.
// var mongodb = require('mongodb');

// //We need to work with "MongoClient" interface in order to connect to a mongodb server.
// var MongoClient = mongodb.MongoClient;

// // Connection URL. This is where your mongodb server is running.

// var url = 'mongodb://admin:admin1234@ds257507.mlab.com:57507/heroku_rtrm41m6';      

// // Use connect method to connect to the Server
//   MongoClient.connect(url, function (err, db) {
//   if (err) {
//     console.log('Unable to connect to the mongoDB server. Error:', err);
//   } else {
//     console.log('Connection established to', url);

//    // db.close();
//   }
// })