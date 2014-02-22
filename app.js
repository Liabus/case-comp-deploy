var express = require('express');
var app = express();
var ch = require('child_process');


app.get('/postreceive', function(req, res){
    
    console.log(req);
    
    var child = ch.exec('git submodule -q foreach git pull -q origin master', [], function(err, stdout, stderr) {
        console.log(stdout, stderr); 
        
        var child2 = ch.exec('pm2 restart all', [], function(err, stdout, stderr) {
            console.log(stdout, stderr); 
            res.send('Triggered code update. Thanks!');
        });
    });
});


app.listen(1337, function(){
    console.log('Deployment Server Started');
});