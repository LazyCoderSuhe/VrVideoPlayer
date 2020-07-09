VRVideoPlayer.VRCamera = function (videoplay, option) {
    var scope = this;
    var divwidth = videoplay.options.width;
    var divheight = videoplay.options.height;

    this.options = {
        //拍照按钮容器_大圆
        camera: document.createElement("div"),
        camera_width_height: 70,
        camera_border_radius:100,
        camera_right: 30,
        camera_top: 0,
        camera_display: false,
        callback: undefined,/*事件*/


        //拍照按钮
        btn: document.createElement("img"),
        btn_width_height: null,
        btn_src: "./img/xjico.png",
        btn_opacity: 1,
    }



    //拍照按钮容器_大圆
    if (option.camera_width_height != undefined) {
        this.options.camera_width_height = option.camera_width_height;
    }
    if (option.camera_border_radius != undefined) {
        this.options.camera_border_radius = option.camera_border_radius;
    }
    if (option.camera_right != undefined) {
        this.options.camera_right = option.camera_right;
    }
    if (option.camera_top != undefined) {
        this.options.camera_top = option.camera_top;
    }
    if (option.camera_display != undefined) {
        this.options.camera_display = option.camera_display;
    }
    if (option.callback != undefined && option.callback != null && typeof option.callback === "function") {
        this.options.callback = option.callback;
    }

    //拍照按钮容器_大圆
    var camera = function () {
        scope.options.camera_top = divheight / 2 - scope.options.camera_width_height / 2;
    }()
    scope.options.camera.style = "width:" + scope.options.camera_width_height + "px;height:" + scope.options.camera_width_height + "px;top:" + scope.options.camera_top + "px;opacity:1;position: absolute;right:" + scope.options.camera_right + "px;z-index:9999;border:2px solid white;display:" + (scope.options.camera_display ? "block" : "none") + ";border-radius:" + scope.options.camera_border_radius+"px;"
    scope.options.camera.classList.add("camera_active");/*增加class 用于点击时放大动画*/
    videoplay.options.container.appendChild(scope.options.camera);

    //拍照按钮
    var btn_top;
    var btn = function () {
        scope.options.btn_width_height = scope.options.camera_width_height - scope.options.camera_width_height / 14;
        btn_top_left = (scope.options.camera_width_height - scope.options.btn_width_height) / 2;
    }()
    scope.options.btn.style = "width:" + scope.options.btn_width_height + "px;height:" + scope.options.btn_width_height + "px;opacity:" + scope.options.btn_opacity + ";position: absolute;top:" + btn_top_left + "px;left:" + btn_top_left+"px"
    scope.options.btn.src = scope.options.btn_src;
    scope.options.camera.appendChild(scope.options.btn);

    //点击拍照后事件
    scope.options.canbox.ontouchend = function (e) {
        if (scope.options.callback != undefined) {
            scope.options.callback();
        }
    }




    this.setstate = function (camera_display) {
        scope.options.camera_display = camera_display;
        if (camera_display == true) {
            scope.options.camera.style.display = "block";
        } else {
            scope.options.camera.style.display = "none";
        }
    }
    this.getstate = function () {
        return scope.options.camera_display;
    }

}