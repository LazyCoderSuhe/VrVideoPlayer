/**
 *
 * @param {any} videoplay
 * @param {any} option
 * {
 * maxdiv_width:divwidth / 2.3, //最大让其宽度
 * maxdiv_left: divwidth / 2.3, //容器左浮动
 * maxdiv_top: divwidth / 2.3 / 5, 容器上边距
 * maxdiv_height: divheight - divwidth / 2.3 / 5, 最大高度
 * maxdiv_display:ture //都否可见,
 * btn_width:60 // 摇杆 宽度
 * btn_height:60 // 摇杆 高度
 * btn_src:'' // 指纹图像
 * btn_yg_bottom;
 * btn_yg_left
 * }
 */

VRVideoPlayer.VRPlayJoystick = function (videoplay, option) {
    var scope = this;
    var divwidth = videoplay.options.width;
    var divheight = videoplay.options.height;

    console.log(divheight)

    var setint = null;
    var saveLenght = 10;
    var maxR = 1;// 极限角度


    this.options = {
        start_event: function () {

            let cv = maxR / (scope.options.btn_width);

            setint = setInterval(function () {
                if (Math.abs(xpy) > saveLenght) {
                    videoplay.setRotateY(cv * xpy)
                }
                if (Math.abs(ypy) > saveLenght) {
                    videoplay.setRotateX(cv * ypy)
                }
            }, 40)
        },
        move_event: function (x, y) {
        },
        end_event: function () {
            clearInterval(setint);
        },


        /*摇杆容器*/
        maxdiv: document.createElement("div"),
        maxdiv_width: divwidth / 2.3,
        maxdiv_left: divwidth / 2.3 / 4,
        maxdiv_top: divwidth / 2.3 / 5,
        maxdiv_height: divheight - divwidth / 2.3 / 5,
        maxdiv_opacity: 1,
        maxdiv_display: true,

        /*摇杆按钮*/
        btn: document.createElement("img"),
        btn_width: 60,
        btn_height: 60,
        btn_src: "./img/zw.png",
        btn_yg_bottom: null,
        btn_yg_left: null,

        /*摇杆按钮-箭头颜色 宽 高 透明度*/
        btn_up_bottom_left_right_color: "rgba(255,255,255,0.7)",
        btn_up_bottom_left_right_width: 3,
        btn_up_bottom_left_right_height: 3,
        btn_up_bottom_left_right_opacity: 0,

        /*摇杆按钮-箭头↑*/
        btn_up: document.createElement("span"),
        btb_up_marginBottom: null,
        btb_up_marginLeft: null,

        /*摇杆按钮-箭头 →*/
        btn_right: document.createElement("span"),
        btn_right_marginBottom: null,
        btn_right_marginLeft: null,

        /*摇杆按钮-箭头 ↓*/
        btn_bottom: document.createElement("span"),
        btn_bottom_marginBottom: null,
        btn_bottom_marginLeft: null,

        /*摇杆按钮-箭头 ←*/
        btn_left: document.createElement("span"),
        btn_left_marginBottom: null,
        btn_left_marginLeft: null,

        //摇杆按钮 大圆
        btn_maxRadius: document.createElement("span"),
        btn_maxRadius_width_height: null,
        btn_maxRadius_marginLeft: null,
        btn_maxRadius_marginBottom: null,
    }

    /*摇杆容器 赋值*/
    if (option.maxdiv_width != undefined) {
        this.options.maxdiv_width = option.maxdiv_width;
    }
    if (option.maxdiv_left != undefined) {
        this.options.maxdiv_left = option.maxdiv_left;
    }
    if (option.maxdiv_top != undefined) {
        this.options.maxdiv_top = option.maxdiv_top;
    }
    if (option.maxdiv_height != undefined) {
        this.options.maxdiv_height = option.maxdiv_height;
    }
    if (option.maxdiv_display != undefined) {
        this.options.maxdiv_display = option.maxdiv_display;
    }

    /*摇杆按钮 赋值*/
    if (option.btn_width != undefined) {
        this.options.btn_width = option.btn_width;
    }
    if (option.btn_height != undefined) {
        this.options.btn_height = option.btn_height;
    }
    if (option.btn_src != undefined) {
        this.options.btn_src = option.btn_src;
    }
    if (option.btn_yg_bottom != undefined) {
        this.options.btn_yg_bottom = option.btn_yg_bottom;
    }
    if (option.btn_yg_left != undefined) {
        this.options.btn_yg_left = option.btn_yg_left;
    }

    /*摇杆按钮-去不箭头宽高 赋值*/
    if (option.btn_up_bottom_left_right_width != undefined) {
        this.options.btn_up_bottom_left_right_width = option.btn_up_bottom_left_right_width;
    }
    if (option.btn_up_bottom_left_right_height != undefined) {
        this.options.btn_up_bottom_left_right_height = option.btn_up_bottom_left_right_height;
    }

    /*摇杆按钮-箭头↑ 赋值*/
    if (option.btb_up_marginBottom != undefined) {
        this.options.btb_up_marginBottom = option.btb_up_marginBottom;
    }
    if (option.btb_up_marginLeft != undefined) {
        this.options.btb_up_marginLeft = option.btb_up_marginLeft;
    }
    /*摇杆按钮-箭头→ 赋值*/
    if (option.btn_right_marginBottom != undefined) {
        this.options.btn_right_marginBottom = option.btn_right_marginBottom;
    }
    if (option.btn_right_marginLeft != undefined) {
        this.options.btn_right_marginLeft = option.btn_right_marginLeft;
    }
    /*摇杆按钮-箭头↓ 赋值*/
    if (option.btn_bottom_marginBottom != undefined) {
        this.options.btn_bottom_marginBottom = option.btn_bottom_marginBottom;
    }
    if (option.btn_right_marginLeft != undefined) {
        this.options.btn_bottom_marginLeft = option.btn_bottom_marginLeft;
    }
    /*摇杆按钮-箭头← 赋值*/
    if (option.btn_left_marginBottom != undefined) {
        this.options.btn_left_marginBottom = option.btn_left_marginBottom;
    }
    if (option.btn_left_marginLeft != undefined) {
        this.options.btn_left_marginLeft = option.btn_left_marginLeft;
    }

    //计算摇杆按位置
    var btn = function () {
        scope.options.btn_yg_bottom = divheight / 5;
        scope.options.btn_yg_left = divwidth / 2.3 / 5;
    }()
    //计算摇杆按钮 - 箭头↑ -位置
    var btn_up = function () {
        //箭头的下边距为 = 箭头高度;
        scope.options.btb_up_marginBottom = scope.options.btn_up_bottom_left_right_width;
        //箭头的左边距为 = 摇杆按钮宽度 / 2 - 箭头宽度 / 2 ;
        scope.options.btb_up_marginLeft = scope.options.btn_width / 2 - scope.options.btn_up_bottom_left_right_width / 2;
    }();
    //计算摇杆按钮 - 箭头→  -位置
    var btn_right = function () {
        //箭头的下边距为 = 摇杆按钮高度 / 2 - 箭头高度 * 2 ;
        scope.options.btn_right_marginBottom = scope.options.btn_height / 2 - scope.options.btn_up_bottom_left_right_height * 2;
        //箭头的左边距为 = 摇杆按钮宽度  - 箭头宽度 * 2 ;
        scope.options.btn_right_marginLeft = scope.options.btn_width - scope.options.btn_up_bottom_left_right_width * 2.2;
    }();
    //计算摇杆按钮 - 箭头↓  -位置
    var btn_bottom = function () {
        //箭头的下边距为 = 摇杆按钮下边距 + 摇杆按钮高度 / 2 - 箭头高度 / 2 ;
        scope.options.btn_bottom_marginBottom = scope.options.btn_width - scope.options.btn_up_bottom_left_right_width * 5;
        //箭头的左边距为 = 摇杆按钮宽度 / 2 - 箭头宽度 / 2;
        scope.options.btn_bottom_marginLeft = scope.options.btn_width / 2 - scope.options.btn_up_bottom_left_right_width / 2;
    }();
    //计算摇杆按钮 - 箭头←  -位置
    var btn_left = function () {
        //箭头的下边距为 = 摇杆按钮高度 / 2 - 箭头高度 * 2 ;
        scope.options.btn_left_marginBottom = scope.options.btn_height / 2 - scope.options.btn_up_bottom_left_right_height * 4;
        //箭头的左边距为 = 箭头宽度;
        scope.options.btn_left_marginLeft = scope.options.btn_up_bottom_left_right_width;
    }();
    //计算大圆
    var btn_maxRadius = function () {
        scope.options.btn_maxRadius_width_height = scope.options.btn_width * 2;
        scope.options.btn_maxRadius_marginLeft = scope.options.btn_yg_left - 1;
        scope.options.btn_maxRadius_marginBottom = scope.options.btn_yg_bottom - 1;
    }();


    var mrx = null;
    var mry = null;

    var x0, y0;
    var xpy, ypy;
    //手指按下时
    var lsfontouchstart = function () {
        scope.options.maxdiv.ontouchstart = function (e) {
            //获取点击焦点
            var touch = e.touches[0];
            var x = touch.clientX;
            var y = touch.clientY;

            x0 = x;
            y0 = y;

            //指纹按钮坐标
            //指纹按钮x位置 = 指纹触发大容器的左边距 - 指纹按钮宽度的一半
            var xx = x - scope.options.maxdiv_left - scope.options.btn_width / 2;
            //指纹按钮y位置 = 指纹触发大容器的上边距 - 指纹按钮高度的一半
            var yy = y - scope.options.maxdiv_top - scope.options.btn_height / 2
            scope.options.btn.style.top = yy + "px";
            scope.options.btn.style.left = xx + "px";

            //存储点击起始点
            mrx = xx;
            mry = yy;


            //大圆位置 = 指纹按钮的位置 - 2像素边框 - 大圆1/4
            scope.options.btn_maxRadius.style.left = xx - 1 + "px";
            scope.options.btn_maxRadius.style.top = yy - 1 + "px";
            scope.options.btn_maxRadius.classList.add("btn_maxRadius");

            scope.options.start_event();
        }

        //移动时
        scope.options.maxdiv.ontouchmove = function (e) {
            //获取点击焦点
            var touch = e.touches[0];
            var x = touch.clientX;
            var y = touch.clientY;

            //让指纹按钮位以点击位置为中心：
            //指纹按钮x位置 = 指纹触发大容器的左边距 - 指纹按钮宽度的一半
            var xx = x - scope.options.maxdiv_left - scope.options.btn_width / 2;
            //指纹按钮y位置 = 指纹触发大容器的上边距 - 指纹按钮高度的一半
            var yy = y - scope.options.maxdiv_top - scope.options.btn_height / 2

            //规定指纹按钮移动范围，不能超过大圆
            var maxradius_banjing = scope.options.btn_maxRadius_width_height / 2;/*大圆半径*/
            t_cy = yy - mry;//计算差值 y
            t_cx = xx - mrx;//计算差值 x
            t_radis = Math.sqrt(t_cy * t_cy + t_cx * t_cx); //  计算两点间距离，三角函数
            t_cenbl = maxradius_banjing / t_radis; //  计算 三角边长比例
            t_maxx = t_cenbl * t_cx; // 计算 最大值
            t_maxy = t_cenbl * t_cy; // 计算 最大值
            // 计算处理 最大可移动距离
            if (t_radis > maxradius_banjing) {
                t_ux = mrx + t_maxx;
                t_uy = mry + t_maxy;
            } else {
                t_uy = yy;
                t_ux = xx;
            }
            //赋值
            scope.options.btn.style.left = t_ux + "px";
            scope.options.btn.style.top = t_uy + "px";

            //计算偏移量 = 初始坐标位置 - 当前坐标
            var cxpy = x - x0;
            var cypy = y - y0;

            var pf = Math.sqrt(cxpy * cxpy + cypy * cypy);

            if (pf > scope.options.btn_width) {
                let gg = scope.options.btn_width / pf;
                cxpy = cxpy * gg;
                cypy = cypy * gg;

            }
            xpy = cxpy
            ypy = cypy

        }

        scope.options.maxdiv.ontouchend = function (e) {
            //大圆位置 = 指纹按钮的位置 - 2像素边框 - 大圆1/4
            scope.options.btn_maxRadius.classList.remove("btn_maxRadius");

            //指纹按钮归位
            scope.options.btn.style.bottom = scope.options.btn_yg_bottom + "px";
            scope.options.btn.style.left = scope.options.btn_yg_left + "px";
            scope.options.btn.style.top = "auto";

            scope.options.end_event();
        }


    }()



    /*摇杆容器*/
    scope.options.maxdiv.style = "position:absolute;z-index:999;width:" + scope.options.maxdiv_width + "px;height:" +
        scope.options.maxdiv_height + "px;left:" + scope.options.maxdiv_left + "px;top:" + scope.options.maxdiv_top + "px;opacity:" + scope.options.maxdiv_opacity + ";display:" + (scope.options.maxdiv_display ? "block" : "none");
    videoplay.options.container.appendChild(scope.options.maxdiv);

    /*摇杆按钮*/
    scope.options.btn.style = "display:block;position:absolute;z-index:999;width:" + scope.options.btn_width + "px;height:" + scope.options.btn_height +
        "px;left:" + scope.options.btn_yg_left + "px;bottom:" + scope.options.btn_yg_bottom + "px";
    scope.options.btn.src = scope.options.btn_src;
    scope.options.maxdiv.appendChild(scope.options.btn);

    /*摇杆按钮-箭头↑*/
    scope.options.btn_up.style = "width:" + scope.options.btn_up_bottom_left_right_width + "px;height:" + scope.options.btn_up_bottom_left_right_width + "px;border-top:1px solid white;border-right: 1px solid white;transform: rotate(-45deg);display:block;position: relative;left:" + scope.options.btb_up_marginLeft + "px;top:" + scope.options.btb_up_marginBottom + "px;";
    scope.options.btn_maxRadius.appendChild(scope.options.btn_up);

    /*摇杆按钮-箭头 →*/
    scope.options.btn_right.style = "width:" + scope.options.btn_up_bottom_left_right_width + "px;height:" + scope.options.btn_up_bottom_left_right_width + "px;border-top:1px solid white;border-right: 1px solid white;transform: rotate(45deg);display:block;position:relative;top:" + scope.options.btn_right_marginBottom + "px;left:" + scope.options.btn_right_marginLeft + "px";
    scope.options.btn_maxRadius.appendChild(scope.options.btn_right);

    /*摇杆按钮-箭头 ↓*/
    scope.options.btn_bottom.style = "width:" + scope.options.btn_up_bottom_left_right_width + "px;height:" + scope.options.btn_up_bottom_left_right_width + "px;border-top:1px solid white;border-right: 1px solid white;transform: rotate(135deg);display:block;position:relative;left:" + scope.options.btn_bottom_marginLeft + "px;top:" + scope.options.btn_bottom_marginBottom + "px;"
    scope.options.btn_maxRadius.appendChild(scope.options.btn_bottom);

    /*摇杆按钮-箭头 ←*/
    scope.options.btn_left.style = "width:" + scope.options.btn_up_bottom_left_right_width + "px;height:" + scope.options.btn_up_bottom_left_right_width + "px;border-top:1px solid white;border-right: 1px solid white;transform: rotate(-135deg);display:block;position:relative;top:" + scope.options.btn_left_marginBottom + "px;left:" + scope.options.btn_left_marginLeft + "px;"
    scope.options.btn_maxRadius.appendChild(scope.options.btn_left);

    //摇杆按钮 大圆
    scope.options.btn_maxRadius.style = "width:" + scope.options.btn_width + "px;height:" + scope.options.btn_height + "px;border: 1px solid white;position:absolute;bottom:" +
        scope.options.btn_maxRadius_marginBottom + "px;left:" + scope.options.btn_maxRadius_marginLeft + "px;opacity:1；display:block;border-radius:1000px;opacity:0;"
    scope.options.maxdiv.appendChild(scope.options.btn_maxRadius);



    this.setstate = function (maxdivOpacity) {
        scope.options.maxdiv_display = maxdivOpacity;
        if (maxdivOpacity == true) {
            scope.options.maxdiv.style.display = "block";
        } else {
            scope.options.maxdiv.style.display = "none";
        }
    }
    this.getstate = function () {
        return scope.options.maxdiv_display
    }
}
