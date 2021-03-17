// 入口函数
$(function () {
    // 1.自定义校验规则
    // 导出form
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            let length = value.trim().length;//用户昵称长度
            if (length <= 1 || length > 6) {
                return '您的昵称长度必须在2-6位哦😯';
            }
            // layer.msg('修改成功');
        }
    })

    let layer = layui.layer;//导出 layui 中的 layer
    //调用
    initUserInfo();
    // 2.封装函数,后面会用到获取用户信息 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: (res) => {
                // console.log(res);
                // 验证用户身份
                if (res.status != 0) { return layer.msg(res.message); }
                // 成功后,渲染
                form.val('formUserInfo', res.data);
            },
        })
    }

    // 3.重置按钮
    $('#btnReset').on('click', function (e) {
        // 阻止表单默认提交
        e.preventDefault();
        // console.log(1);
        initUserInfo();
    })

    // 4.表单提交
    $('.layui-form').on('submit', function (e) {//表单默认带有提交事件
        // 阻止默认事件
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) return layer.msg('用户信息修改失败!', { icon: 5 });
                // 成功
                layer.msg('恭喜你呀!用户信息修改成功啦', { icon: 6 });
                // 调用父级方法
                window.parent.getUserInfo();
            },
        })
    })

})