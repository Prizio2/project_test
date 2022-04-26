$(function() {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui();

    $(".input_sub").on("click", function() {
        var text = $(".input_txt").val().trim();
        if (text.length <= 0) {
            return $(".input_txt").val("");
        } else {
            $(".talk_list").append('<li class="right_word"><img src = "img/person02.png" /><span>' + text + '</span></li>');
            resetui();
            $(".input_txt").val("");
        };
        getMsg(text);
        getVoice(text);
    });

    // 发起请求获取聊天消息
    function getMsg(text) {
        $.ajax({
            type: "GET",
            url: "http://www.liulongbin.top:3006/api/robot",
            data: { spoken: text },
            success: function(res) {
                if (res.message === 'success') {
                    var msg = res.data.info.text;
                    $(".talk_list").append('<li class="left_word"><img src ="img/hsz.jpg" /><span>' + msg + '</span></li>');
                    resetui();
                    getVoice(msg);
                }
            }
        });
    };

    // 获取机器人聊天语言
    function getVoice(text) {
        $.ajax({
            type: "GET",
            url: "http://www.liulongbin.top:3006/api/synthesize",
            data: { text: text },
            success: function(res) {
                if (res.status === 200) {
                    $("#voice").attr("src", res.voiceUrl);
                }
            }
        });
    };

    // 通过回车键发送消息
    $(".input_txt").on("keyup", function(e) {
        // console.log(e.keyCode);
        if (e.keyCode === 13) {
            $(".input_sub").click();
        }
    });
})