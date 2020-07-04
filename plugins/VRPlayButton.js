/**
 * 
 * @param {VRVideoPlayer} videoplay 播放器对象
 * @param {any} option {size:播放按钮大小，callback:回调函数，src：播放按钮图片} 
 */
VRVideoPlayer.PlayButton = function (videoplay, option) {
    this.options = {
        playbtn_size: 70,/*属性*/
        src: "./img/play.png",
        callback: undefined,/*事件*/
    }
    if (option.size != undefined) {
        this.options.playbtn_size = option.size;
    }
    if (option.callback != undefined && option.callback != null && typeof option.callback === "function") {
        this.options.callback = option.callback;
    }
    if (option.src != undefined) {
        this.options.src = option.src;
    }
    var scope = this;
    var divwidth = videoplay.options.width;
    var divheight = videoplay.options.height;
    var imgbtn = document.createElement("img");
    imgbtn.src = scope.options.src;
    imgbtn.style = "z-index:9999;width:" + scope.options.playbtn_size + "px;height:" + scope.options.playbtn_size + "px;position: absolute;left:" + (divwidth - scope.options.playbtn_size) / 2 + "px;top:" + (divheight - scope.options.playbtn_size) / 2 + "px;";
    function playvideo(e) {
        imgbtn.hidden = true;
        videoplay.play();
        if (scope.options.callback != undefined) {
            scope.options.callback();
        }
    }
    imgbtn.addEventListener("mousedown", playvideo, false);
    imgbtn.addEventListener("touchend", playvideo, false);
    videoplay.options.container.appendChild(imgbtn);
    this.getstate = function () {
        return imgbtn.hidden;
    }
    /**
     * 设置按钮是否显示
     * @param {boolean} hiddebool
     */
    this.setstate = function (hiddebool) {
        imgbtn.hidden = hiddebool;
    }
}
