/**
 * 
 * @param {any} videoplay 播放器对象
 * @param {any} option{ canbox_right：canvas右边距， canbox_display：是否显示canvas，kd_font_size:刻度标数字体大小，kd_color：刻度标数颜色，kd_right：刻度标数右边距，kd_top：刻度标数上边距，kd_show：是否显示刻度标数true显示 false隐藏}
 */
VRVideoPlayer.VRPlayRuler = function (videoplay, option) {
    var scope = this;
    var divwidth = videoplay.options.width;
    var divheight = videoplay.options.height;

    this.options = {
        //canvars容器
        canbox: document.createElement("div"),
        canbox_height: divheight - divheight / 10,
        canbox_height_c2: (divheight - divheight / 10) / 2,
        canbox_top: divheight / 20,
        canbox_right: 10,
        canbox_display: true,
        //canvas
        canvas: document.createElement("canvas"),
        //刻度标数
        kd: document.createElement("span"),
        kd_font_size: 16,
        kd_color: "white",
        kd_right: null,
        kd_top: null,
        kd_show: true,
    }

    //红色半圆
    var cxt;
    var blue_line_max_length = 26;//最长的蓝线_长度
    var white_line_max_length = 20//最长的白线_长度
    var white_line_min_length = 15//最短的白线_长度
    var red_line_radius = scope.options.canbox_height_c2 - blue_line_max_length;//半圆红线_半径

    //刻度指示图
    var img0 = new Image()
    img0.src = "img/11.png";
    var img10 = new Image()
    img10.src = "img/22.png";
    var img20 = new Image()
    img20.src = "img/33.png";
    var img30 = new Image()
    img30.src = "img/44.png";
    var img40 = new Image()
    img40.src = "img/55.png";
    var img50 = new Image()
    img50.src = "img/66.png";
    var img60 = new Image()
    img60.src = "img/77.png";
    img60.onload = function () {
        Randerer();
    }

    var xh = 20//两端白色线条高度
    var xhext = 10//白色线条 按下时，屏幕水平位置的线条变成蓝色时的 扩展长度
    var h = window.screen.availHeight - window.screen.availHeight / 5.7
    var cheight = h / 2  //半径高度 未减线条
    var pi15 = (Math.PI * 1.5).toFixed(4)
    var xc = 1; //密密麻麻刻度条线粗
    var cwidth = 0;
    var bj = cheight - 20;//半径
    var kdbl = (Math.PI / 60).toFixed(4); //刻度平均分配比例
    var minxc = 5; //最短密密麻麻刻度条线粗
    var maxxc = 10;//最长密密麻麻刻度条线粗
    var dqrotate = 0;
    var kevalue = bj - 26; //刻度值 位置
    var touchcolor = "#0c00ff";
    var c2pi = (Math.PI / 2).toFixed(4); //2分之1 Math.PI
    var qjz = kdbl * 3; //60分之一Math.PI X 3
    var bjz = (xhext / qjz).toFixed(4);//白色线条扩展长度 除以 60分之一Math.PI X 3
    var istouch = false; //点击状态
    var dqwz = { x: null, y: null };//当前偏移量
    var cscale = (50 / c2pi).toFixed(0);
    var bzwzoff = null; //当前刻度值 隐藏动画
    var imgsize = 26; // 刻度标数 图片大小
    var t,ox, oy, nx, ny, aa, bb, cc, x, y;
    var rodic = {};
    var nowvalue = 50;//当前刻度值，也用于全景视频播放器播放角度
    var zf = 0;
   
    var Randerer = function () {
     //   requestAnimationFrame(Randerer)
        if (cxt == null) {
            cxt = scope.options.canvas.getContext("2d");
        }
        cwidth = (scope.options.canvas.width - xc);
        cxt.clearRect(0, 0, scope.options.canvas.width, scope.options.canvas.height);
        //移动原点
        cxt.translate(scope.options.canbox_height_c2, scope.options.canbox_height_c2);
        //使用当前值dqrotate 旋转画布
        cxt.rotate(dqrotate);

        //中心点
        //cxt.fillStyle = "blue";
        //cxt.fillRect(0, 0, 4, 4);
        //cxt.font = "16px bold 宋体";

        //半圆
        cxt.beginPath();
        cxt.arc(0, 0, bj, c2pi, pi15);
        cxt.strokeStyle = 'red';
        cxt.lineWidth = 2.5;
        cxt.stroke();

        //线段
        var rotatekd = 0;
        for (var i = 0; i <= 60; i++) {
            rotatekd = kdbl * i;
            var pyz = Math.abs(rotatekd - c2pi + dqrotate);
            cxt.strokeStyle = 'white';
            cxt.rotate(rotatekd);
            var xcc = i % 10 == 0 ? minxc : maxxc;
            cxt.beginPath();
            var blueyend = xh;
            if (istouch) {
                if (pyz <= qjz) {
                    cxt.strokeStyle = touchcolor;
                    blueyend = xh + xhext - pyz * bjz;
                }
            }
            cxt.moveTo(0, bj + xcc);
            cxt.lineTo(0, bj + blueyend);
            cxt.lineWidth = xc;
            cxt.stroke();
            cxt.rotate(-rotatekd);
        }
        //刻度标数
        for (var i = 0; i <= 60; i++) {
            if (i % 10 == 0) {
                var hhh = i / 10;
                if (hhh == 0) {
                    cxt.rotate(kdbl * i);
                    cxt.drawImage(img0, -20, kevalue, imgsize, imgsize);
                    cxt.rotate(-kdbl * i);
                } else if (hhh == 1) {
                    cxt.rotate(kdbl * i);
                    cxt.drawImage(img10, -8, kevalue, imgsize, imgsize);
                    cxt.rotate(-kdbl * i);
                } else if (hhh == 2) {
                    cxt.rotate(kdbl * i);
                    cxt.drawImage(img20, -8, kevalue, imgsize, imgsize);
                    cxt.rotate(-kdbl * i);
                } else if (hhh == 3) {
                    cxt.rotate(kdbl * i);
                    cxt.drawImage(img30, -8, kevalue, imgsize, imgsize);
                    cxt.rotate(-kdbl * i);
                } else if (hhh == 4) {
                    cxt.rotate(kdbl * i);
                    cxt.drawImage(img40, -8, kevalue, imgsize, imgsize);
                    cxt.rotate(-kdbl * i);
                } else if (hhh == 5) {
                    cxt.rotate(kdbl * i);
                    cxt.drawImage(img50, -8, kevalue, imgsize, imgsize);
                    cxt.rotate(-kdbl * i);
                } else if (hhh == 6) {
                    cxt.rotate(kdbl * i);
                    cxt.drawImage(img60, -4, kevalue, imgsize, imgsize);
                    cxt.rotate(-kdbl * i);
                }
            }
        }
        cxt.rotate(-dqrotate);
        //移动原点
        cxt.translate(-scope.options.canbox_height_c2, -scope.options.canbox_height_c2);
    }  

    /*canvars 赋值*/
    if (option.canbox_width != undefined) {
        this.options.canbox_width = option.canbox_width;
    }
    if (option.canbox_height != undefined) {
        this.options.canbox_height = option.canbox_height;
    }
    if (option.canbox_display != undefined) {
        this.options.canbox_display = option.canbox_display;
    }
    //刻度标数
    if (option.kd_font_size != undefined) {
        this.options.kd_font_size = option.kd_font_size;
    }
    if (option.kd_color != undefined) {
        this.options.kd_color = option.kd_color;
    }
    if (option.kd_right != undefined) {
        this.options.kd_right = option.kd_right;
    }
    if (option.kd_top != undefined) {
        this.options.kd_top = option.kd_top;
    }
    if (option.kd_show != undefined) {
        this.options.kd_show = option.kd_show;
    }

    //canvas容器
    var cboxwidth = (scope.options.canbox_height_c2 + blue_line_max_length);
    scope.options.canbox.style = "width:" + cboxwidth + "px;height:" + scope.options.canbox_height + "px;top:" + scope.options.canbox_top + "px;opacity:1;display:block;position: absolute;right:" + scope.options.canbox_right + "px;z-index:999;display:" + (scope.options.canbox_display ? "block" : "none");
    videoplay.options.container.appendChild(scope.options.canbox);

    //canvas
    scope.options.canbox.appendChild(scope.options.canvas);
    scope.options.canvas.width = cboxwidth
    scope.options.canvas.height = scope.options.canbox_height;
    Randerer();

    //计算刻度标数
    var kdshow
    var kd = function () {
        if (scope.options.kd_show == true) {
            kdshow = "block";
        } else {
            kdshow = "none";
        }
        scope.options.kd_right = cboxwidth + scope.options.canbox_right;
        scope.options.kd_top = divheight / 2 - scope.options.kd_font_size / 2;
    }();
    //刻度标数
    scope.options.kd.style = "position: absolute;z-index:999;font-size:" + scope.options.kd_font_size + "px;color:" + scope.options.kd_color + ";display:" + kdshow + ";right:" + scope.options.kd_right + "px;top:" + scope.options.kd_top+"px;opacity:0;"
    videoplay.options.container.appendChild(scope.options.kd);

    var touchcolor = "#0c00ff";
    var c2pi = (Math.PI / 2).toFixed(4); //2分之1 Math.PI
    var qjz = kdbl * 3; //60分之一Math.PI X 3
    var bjz = (xhext / qjz).toFixed(4);//白色线条扩展长度 除以 60分之一Math.PI X 3
    var mathpinumber = (Math.PI / 100).toFixed(4);//Math.PI 转换 为0-100数值 
    var changeevalue = function(val) {
        nowvalue += val
      
        if (nowvalue < 0) {
            nowvalue = 0;
            return;
        } else if (nowvalue >= 100) {
            nowvalue = 100;
            return;
        }
        var t = (nowvalue * 0.6).toFixed(0);
        dqrotate = c2pi - mathpinumber * nowvalue;   //当前旋转角度 

        videoplay.setFLength(nowvalue);
        var t = (nowvalue * 0.6).toFixed(0);
        if (t >= 0 && t < 5) {
            scope.options.kd.innerText = "小行星";
        } else if (t > 5 && t < 15) {
            scope.options.kd.innerText = "透视";
        } else if (t >= 15 && t < 30) {
            if (t == 15) {
                scope.options.kd.innerText = "0X";
            } else if (t == 16) {
                scope.options.kd.innerText = "0.1X";
            } else if (t == 17) {
                scope.options.kd.innerText = "0.2X";
            } else if (t == 18) {
                scope.options.kd.innerText = "0.3X";
            } else if (t == 19) {
                scope.options.kd.innerText = "0.4X";
            } else if (t == 20) {
                scope.options.kd.innerText = "0.5X";
            } else if (t == 22) {
                scope.options.kd.innerText = "0.6X";
            } else if (t == 24) {
                scope.options.kd.innerText = "0.7X";
            } else if (t == 26) {
                scope.options.kd.innerText = "0.8X";
            } else if (t == 28) {
                scope.options.kd.innerText = "0.9X";
            }
        } else if (t >= 30 && t < 40) {
            if (t == 30) {
                scope.options.kd.innerText = "1X";
            } else if (t == 31) {
                scope.options.kd.innerText = "1.1X";
            } else if (t == 32) {
                scope.options.kd.innerText = "1.2X";
            } else if (t == 33) {
                scope.options.kd.innerText = "1.3X";
            } else if (t == 34) {
                scope.options.kd.innerText = "1.4X";
            } else if (t == 35) {
                scope.options.kd.innerText = "1.5X";
            } else if (t == 36) {
                scope.options.kd.innerText = "1.6X";
            } else if (t == 37) {
                scope.options.kd.innerText = "1.7X";
            } else if (t == 38) {
                scope.options.kd.innerText = "1.8X";
            } else if (t == 39) {
                scope.options.kd.innerText = "1.9X";
            } else if (t == 40) {
                scope.options.kd.innerText = "2.0X";
            }
        } else if (t >= 40 && t <= 50) {
            if (t == 41) {
                scope.options.kd.innerText = "2.2X";
            } else if (t == 42) {
                scope.options.kd.innerText = "2.4X";
            } else if (t == 43) {
                scope.options.kd.innerText = "2.6X";
            } else if (t == 44) {
                scope.options.kd.innerText = "2.8X";
            } else if (t == 45) {
                scope.options.kd.innerText = "3X";
            } else if (t == 46) {
                scope.options.kd.innerText = "3.2X";
            } else if (t == 47) {
                scope.options.kd.innerText = "3.4X";
            } else if (t == 48) {
                scope.options.kd.innerText = "3.6X";
            } else if (t == 49) {
                scope.options.kd.innerText = "3.8X";
            } else if (t == 50) {
                scope.options.kd.innerText = "4.0X";
            }
        } else if (t >= 50 && t <= 60) {
            if (t == 51) {
                scope.options.kd.innerText = "4.2X";
            } else if (t == 52) {
                scope.options.kd.innerText = "4.4X";
            } else if (t == 53) {
                scope.options.kd.innerText = "4.6X";
            } else if (t == 54) {
                scope.options.kd.innerText = "4.8X";
            } else if (t == 55) {
                scope.options.kd.innerText = "5.0X";
            } else if (t == 56) {
                scope.options.kd.innerText = "5.2X";
            } else if (t == 57) {
                scope.options.kd.innerText = "5.4X";
            } else if (t == 58) {
                scope.options.kd.innerText = "5.6X";
            } else if (t == 59) {
                scope.options.kd.innerText = "5.8X";
            } else if (t == 60) {
                scope.options.kd.innerText = "6.0X";
            }
        }
    }

    var my;
    var windowheight2 = divheight / 2;
    //手指按下时
    var lsfontouch = function () {
        scope.options.canbox.ontouchstart = function (e) {
            //console.log("点击");
            my = e.targetTouches[0].clientY;/*获取鼠标点击时Y轴*/
            istouch = true; //点击状态
            changeevalue(0);
            e.preventDefault();
            Randerer();
            scope.options.kd.classList.add("kdshow");/*刻度标数显示动画*/
            scope.options.kd.classList.remove("kdhide");
        }

        scope.options.canbox.ontouchmove = function (e) {
            //console.log("移动");
            x = (e.targetTouches[0].clientX - scope.options.canvas.getBoundingClientRect().left).toFixed(0);
            y = (e.targetTouches[0].clientY - scope.options.canvas.getBoundingClientRect().top).toFixed(0);

            if (x - cwidth > 0) {
                return;
            }

            if (dqwz.y != null) {
                ox = (dqwz.x - cwidth).toFixed(0);
                oy = (dqwz.y - cheight).toFixed(0);
                nx = (x - cwidth).toFixed(0);
                ny = (y - cheight).toFixed(0);
                var kv = rodic[ox + "_" + oy + "_" + nx + "+" + ny];
                if (kv == undefined && kv == null) {
                    aa = Math.atan2(ox, oy);
                    bb = Math.atan2(nx, ny);
                    cc = bb - aa;
                    kv = cc * cscale;
                    rodic[ox + "_" + oy + "_" + nx + "+" + ny] = kv;
                }
                changeevalue(kv);
            }
            dqwz.x = x;
            dqwz.y = y;
            Randerer();
        }

        scope.options.canbox.ontouchend = function (e) {
            istouch = false; //点击状态
            changeevalue(0);
            if (ox != null) {
                dqwz.x = null;
                dqwz.y = null;
                ox = null;
                oy = null;
                nx = null;
                ny = null;
                aa = null;
                bb = null;
                cc = null;
                x = null;
                y == null;
            }
            scope.options.kd.classList.add("kdhide");/*刻度标数隐藏动画*/
            scope.options.kd.classList.remove("kdshow");
            Randerer();
        }

    }()

    this.setstate = function (canbox_display) {
        scope.options.maxdiv_display = canbox_display;
        if (canbox_display == true) {
            scope.options.canbox.style.display = "block";
        } else {
            scope.options.canbox.style.display = "none";
        }
    }
    this.getstate = function () {
        return scope.options.maxdiv_display;
    }

}