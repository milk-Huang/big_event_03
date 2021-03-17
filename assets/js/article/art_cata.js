$(function () {
    // 1.渲染文章分类列表 ,(后面删除等操作还有调用,封装函数)
    let layer = layui.layer;
    initArtCataList();
    // 2.函数封装
    function initArtCataList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: (res) => {
                // console.log(res);
                // 错误提示
                if (res.status != 0) return layer.msg(res.msssage);
                // 成功,渲染页面
                const str = template('tpl-btn', res);
                $('tbody').html(str);

            },
        })
    }

    // 3.弹出对话框  显示添加文章类别弹出层
    let index = null;
    $('#btnAdd').on('click', function () {
        // alert(1)
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章类别',
            content: $('#dialog-add').html(),
        });
    })

    // 4.事件代理完成, 添加文章分类
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();//阻止表单默认提交
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) return layer.msg(res.msssage);
                // 成功提示
                layer.msg('恭喜您,文章分类添加成功啦');
                // 调用,自动渲染页面
                initArtCataList();//获取最新数据
                // 清空表单数据
                $('#form-add')[0].reset();//转为 dom 对象 进行操作
                // 关闭弹出层
                layer.close(indexAdd);
            },
        })
    })

    // 5.点击编辑按钮 展示表单
    let indexEdit = null;
    let form = layui.form;
    $('tbody').on('click', '.btn-edit', function () {
        // console.log(1);
        // 4.1利用框架代码,展示
        indexEdit = indexAdd = layer.open({
            type: 1,
            area: ['500px', '240px'],
            title: '修改文章类别',
            content: $('#dialog-edit').html(),
        });
        // 4.2获取id值  发送 ajax  渲染页面
        let Id = $(this).attr('data-id');
        // console.log(Id);
        $.ajax({
            // type 默认 get 类型
            // url: '/my/article/cates/:id',  需要进行修改
            url: '/my/article/cates/' + Id,
            success: (res) => {
                // console.log(res);
                form.val('from-edit', res.data);
            },
        })
    })

    // 6.修改文章分类
    $('body').on('submit', '#form-edit', function (e) {
        // 阻止默认提交
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) return layer.msg(res.msssage);
                // 成功
                layer.msg('恭喜你,文章类别修改成功');
                // 渲染页面
                initArtCataList();
                // 清空表单
                $('#form-edit')[0].reset();
                // 关闭弹出层
                layer.close(indexAdd);
            },
        })
    })

    // 7.删除
    $('body').on('click', '.btn-delete', function () {
        // 4.2获取id 发送 ajax 获取数据 渲染页面
        let Id = $(this).attr('data-id');
        // 4.1显示对话框
        layer.confirm('确定要删除嘛?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'GET',
                url: '/my/article/deletecate/' + Id,
                success: (res) => {
                    // console.log(res);
                    if (res.status != 0) return layer.msg(res.message);
                    layer.msg('恭喜您,文章类别删除成功啦');
                    initArtCataList();
                    // 关闭对话框
                    layer.close(index);

                },
            })
        });
    })
})