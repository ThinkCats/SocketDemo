/**
 *
 * Created by wang on 15-3-3.
 */
window.onload = function() {
    //实例并初始化我们的hichat程序
    var hichat = new HiChat();
    hichat.init();
};

//定义我们的hichat类
var HiChat = function() {
    this.socket = null;
};

//向原型添加业务方法
HiChat.prototype = {
    init: function() {//此方法初始化程序
        var that = this;
        //建立到服务器的socket连接
        this.socket = io.connect();
        //监听socket的connect事件，此事件表示连接已经建立
        this.socket.on('connect', function() {
            //连接到服务器后，显示昵称输入框
            document.getElementById('info').textContent = 'get yourself a nickname :)';
            document.getElementById('nickWrapper').style.display = 'block';
            document.getElementById('nicknameInput').focus();
        });

        // 绑定名称的时候，按钮的事件
        document.getElementById('loginBtn').addEventListener('click', function () {
            var nickname=document.getElementById('nicknameInput').value;
            if(nickname.trim().length !=0 ){
                that.socket.emit('login',nickname);
             }else{
                document.getElementById('nicknameInput').focus();
            }
            },false);

        //监听服务端的事件
        this.socket.on('nickExisted',function(){
            document.getElementById('info').textContent='NickName has used by other user,please try others';
        });

        //login success
        this.socket.on('loginsuccess', function () {
            document.title=' hello '+document.getElementById('nicknameInput').value;
            document.getElementById('loginWrapper').style.display='none';
            document.getElementById('messageInput').focus();
        });

        //login and logout
        this.socket.on('system', function (nickname,userCount,type) {
            var msg='user :'+nickname+'  '+ (type == 'login' ? 'joined':' left');
            that._displayNewMsg(nickname,msg,'red');
            document.getElementById('status').textContent= userCount +(userCount >1 ? 'users':'user') +'online' ;
        });
    },

    _displayNewMsg: function (user,msg,color) {
        var container=document.getElementById('historyMsg');
        var msgToDisplay=document.createElement('p');
        var date=new Date().toTimeString().substr(0,8);
        msgToDisplay.style.color=color || '#000';
        msgToDisplay.innerHTML=user+'<span class="timespan" >('+date+'):</span>'+msg;
        container.appendChild(msgToDisplay);
        container.scrollTop=container.scrollHeight;
    }


};

