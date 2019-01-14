var express = require('express');
var path = require('path');
var jade = require('jade');
var fs = require('fs');
var mongodb = require("mongodb");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// not use monk
var server = new mongodb.Server('localhost',27017,{auto_reconnect:true});  
var db = new mongodb.Db("mysite",server,{safe:false});
//打开数据库连接
db.on('open', function(err,db){  
    if(err){  
        console.log(err);  
        return false;  
    }
    else
        console.log('connect!');
});
//连接到collection
var link = function(db){
    return function(req,res){
    db.collection('usercollection', {safe:true}, function(err, collection){
    /*collection方法用于连接现有表，{safe:true} 选项，当collection不存在的时候报错
    createCollection方法用于创建新表，{safe:true} 选项，当collection存在的时候报错
    */
     if(err){
         console.log(err);
     }
     else{
         console.log('get collection!');
         collection.find().toArray(function(err,docs){
         console.log('find');
         res.render('userlist',{userlist:docs});
         });
     }
    });
    }
}

app.get('/',link(db));
/*关于路由link方法的位置，合适的做法是放在routes/index文件里面，但方法里的依赖项太多,所以还是塞到了一个文件里

*/

var list = function(){console.log('hah');}
var port = 8080;
app.listen(port);
console.log('Listening on port ' + port);