// 入口函数
$(function () {
    // 导出form
    let form = layui.form;
    // 1.验证密码规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 新密码
        newPwd: function (value) {
            // 新密码不能与原密码相同   寻找 input 中属性为 name = oldPwd 
            if (value == $('[name=oldPwd').val()) return '新密码不能与原密码一样';
        },
        // 确定新密码
        rePwd: function (value) {
            // 确认密码要能与新密码相同
            if (value !== $('[name=newPwd').val()) return '确认密码要能与新密码相同';
        },
    });
    // 2.修改密码
    $('.layui-form').submit(function (e) {
        // 阻止默认提交
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                // 错误提示
                if (res.status != 0) return layer.msg(res.msg);
                // 成功
                layer.msg('恭喜您,新密码已经生效哦😊');
                // 清空数据  转为 dom 对象
                $('.layui-form')[0].reset();
                // 重定向  调用父级元素
                window.parent.location.href = "/login.html";
            },
        })
    })
})