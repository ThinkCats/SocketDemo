/**
 * Created by wang on 15-3-3.
 */

var app=require('express')();
var http=require('http').Server(app);

/*app.get("/", function (req, res) {
    res.send('<h1>hello world !!!!</h1>');
});*/

app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/index.html');
});

http.listen(3000,function(){
    console.log('listening on :3000');
});
