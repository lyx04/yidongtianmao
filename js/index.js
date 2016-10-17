$(function () {
    var falg = false;
    var photoarr = 0;
    var arr = ["icon-feiji", "icon-hanbao", "icon-dabei", "icon-bianqianmoshi", "icon-shangpinmingcheng"]
    $(".header").on("click", "li", function () {
        $(".header").find("li").removeClass("active")
        $(this).addClass("active")
    })
    $(".bottom").on("click", "li", function () {
        $(".bottom").find("li").removeClass("active")
        if ($(this).attr("class") == "add") {
            return
        }
        $(this).addClass("active")
    })
    if (localStorage.todo_list) {//每次进来只运行一次
        todos = JSON.parse(localStorage.todo_list)//要是后台有数值，就把字符串型的数组，变成真正的数组;
        rander()//再重新绘制
    } else {
        var todos = []//要是运行的时候，后台没有数据，那就新建一个表
        localStorage.todo_list = JSON.stringify(todos)//将数组中的值改变成字符串形式给后台
    }
    // var todos = [{
    //     title: "Air ticket to New York",
    //     dig: "i need a ticket to NY for...",
    //     stste: 1,
    //     photo: "icon-feiji"
    // },
    //     {
    //         title: "Air ticket to New York",
    //         dig: "i need a ticket to NY for...",
    //         stste: 1,
    //         photo: "icon-feiji"
    //     },
    //     {
    //         title: "Air ticket to New York",
    //         dig: "i need a ticket to NY for...",
    //         stste: 1,
    //         photo: "icon-feiji"
    //     }, {
    //         title: "Air ticket to New York",
    //         dig: "i need a ticket to NY for...",
    //         stste: 1,
    //         photo: "icon-feiji"
    //     }
    // ]
    function add() {
        $(".header").addClass("active")
        $(".now").addClass("active3")
        $(".bottom").addClass("active")
        $(".addcontent").addClass("active")
    }

    function remove() {
        $(".header").removeClass("active")
        $(".now").removeClass("active3")
        $(".bottom").removeClass("active")
        $(".addcontent").removeClass("active")
    }

    function rander() {
        $(".now").empty();
        $("<li><h5>NOW</h5></li>").appendTo(".now")
        $.each(todos, function (i, v) {
            $(" <li><p class=" + v.photo + "></p><div class='content'><span class='theme'>" + v.title + "</span><span class='digest'>" + v.dig + "</span></div><div class='delet'>clear</div></li>").addClass("list").appendTo(".now")
        })
    }

    //实现拖拽
    var left = null;

    $(".now").on("touchstart", ".list", function (e) {
        e.stopPropagation()
        left = e.originalEvent.changedTouches[0].pageX
    })
    //修改
    $(".now").on("touchend", ".list", function (e) {
        var n= e.originalEvent.changedTouches[0].pageX
        var x=left-n
        if(x==0){
            $(".addcontent .lists .yes").off("touchstart")
            var inpu = $(this).find(".theme").text()
            var index = $(this).closest("li").index() - 1
            add()
            $(".addcontent .title #inp").val(inpu)
            $(".addcontent .lists .later").on("touchstart", function () {
                var content = $(".addcontent .title #inp").get(0).value
                todos[index].title = content
                localStorage.todo_list = JSON.stringify(todos);
                // console.log(todos[index].title)
                remove()
                rander()
                $(".addcontent .title #inp").val("")
                $(this).off();
            })
        }
        if(x<0){
            $(this).css({"transform": "translate3d(0,0,0)", "overflow-x": "hidden"})
                .delay(200).queue(function () {
                $(this).removeClass("active").dequeue()
            })
        }

    })
    $(".now").on("touchmove", ".list", function (e) {
        e.stopPropagation()
        var n = e.originalEvent.changedTouches[0].pageX
        var x = n - left;
        $(this).css({"transform": "translate3d(" + x + "px,0,0)", "overflow-x": "visible"})
            .delay(200).queue(function () {
            $(this).addClass("active").dequeue()
        })
    })

    //删除
    $(".now").on("touchstart", ".list .delet", function (e) {
        e.stopPropagation()
        var i = $(this).closest('li').index() - 1;
        todos.splice(i, 1);
        $(this).closest("li").addClass("active1").delay(500).queue(function () {
            $(this).closest("li").remove().dequeue()
        })
        localStorage.todo_list = JSON.stringify(todos);
    })
    //点击缩放
    $(".add").on("touchstart", function () {
        $(".addcontent .lists .later").off("touchstart")
        add()
        addinput()
    })
    $(".addcontent p").on("touchstart", function () {
        remove()
    })
    //input赋值
    function addinput() {
        $(".addcontent .lists .yes").on("touchstart", function () {
            if (photoarr == arr.length - 1) {
                phtotarr = 0
            }
            var inpu = $(".addcontent .title #inp").val()
            if (inpu == "") {
                $(".header").removeClass("active")
                $(".now").removeClass("active3")
                $(".bottom").removeClass("active")
                $(".addcontent").removeClass("active")
                $(".addcontent .title #inp").val("")
            } else {
                for (var i = 0; i <= photoarr; i++) {
                    var indexarr = arr[i]
                    console.log(photoarr)
                }
                todos.push({
                        title: inpu,
                        dig: "i need a ticket to NY for...",
                        stste: 1,
                        photo: indexarr
                    }
                )

                localStorage.todo_list = JSON.stringify(todos);
                $(".header").removeClass("active")
                $(".now").removeClass("active3")
                $(".bottom").removeClass("active")
                $(".addcontent").removeClass("active")
                $(".addcontent .title #inp").val("")
                rander()
            }
            photoarr++
        })
    }

    // $(".bottom .add").on("click", function () {
    //
    //     localStorage.todo_list = JSON.stringify(todos)
    //     rander()
    // })

})