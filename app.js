var express = require('express');
var app = express();
var ch = require('child_process');

app.get('/', function(req, res){
    res.send('You have reached the deploy server.');
});

app.all('/postreceive', function(req, res){
    
    res.send('Triggered code update. Thanks!');
    
    var child = ch.exec('git submodule -q foreach git pull -q origin master', [], function(err, stdout, stderr) {
        console.log(stdout, stderr); 
        
        var child2 = ch.exec('pm2 restart all', [], function(err, stdout, stderr) {
            console.log(stdout, stderr);
        });
    });
});


app.listen(1337, function(){
    console.log('Deployment Server Started');
});
