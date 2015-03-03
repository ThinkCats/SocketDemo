/**
 * Created by wang on 15-3-3.
 */

var express=require('express');
var app=express();
var http=require('http');
var server=http.createServer(app);
var io=require('socket.io').listen(server);

var users=[];

app.use('/',express.static(__dirname+'/public'));

server.listen(3000, function (err) {
    if(err){
        console.log(err)
    }else{
        console.log("server start")
    }
});

io.on('connection', function (socket) {
    console.log('io connection...');

    //nickname
    socket.on('login', function (nickname) {
        if(users.indexOf(nickname) > -1){
            socket.emit('nickExisted');
            console.log('nick name has been used:'+nickname);
        }else{
            socket.userIndex=users.length;
            socket.nickname=nickname;
            users.push(nickname);
            socket.emit('loginsuccess');
            console.log("login success,user:"+nickname);
            io.sockets.emit('system',nickname,users.length,'login');
        }
    });

    socket.on('disconnect',function(){
        users.splice(socket.userIndex,1);
        socket.broadcast.emit('system',socket.nickname,users.length,'logout');
    });

});



