/// <reference path="three/build/three.js" />
function isNullOrUndefined(obj) {
    if (obj == undefined || obj == null) {
        return true;
    }
    return false;
}
const cRadian = 180 / Math.PI;
const cPi = Math.PI / 2;
/**
 * 弧度 TO 角度
 * @param {any} val
 */
function RadianToDu(val) {
    return val * cRadian;
};
/**
 * 角度 TO 弧度
 * @param {any} val
 */
function DuToRadian(val) {
    return val / cRadian;
};


function getHeight(element) {
    return element.offsetHeight
}
function getWidth(element) {
    return element.offsetWidth
}
/**
 * 初始化 *  
 * @param {any} option
 * option {
 * fov:84,// 默认 84; 50 - 120
 * src:"" ,//视频源
 * flength: 50, // 默认 50
 * isVR:true,//是否开启 VR
 * isdevicecontrol:true, // 是否开启 陀螺仪
 * istonchcontrol:true, // 是否开启 手指控制
 * startplayEvent:action, // 是否可以播放
 * loadstartEvent:action, //开始加载
 * endedEvent:action, //播放结束
 * animateTimeLenght:2000,
 * autoAnimate:true
 * }
 */




var VRVideoPlayer = function (option) {
    let tag = "VRVideoPlayer"
    var radius = 0
    var scene = new THREE.Scene();//场景
    this.options = {
        autoAnimate: true, //旋转动画
        animateTimeLenght: 2000, //旋转动画时长     
        camera: null,   //相机
        video: null,//Video
        autoplay: false,//自动播放
        container: document.getElementById(option.eid),//容器对象
        pan: 0,//左右
        tilt: 0,// 上下
        fov: 90, //fov 默认值
        src: "",// 视频源
        isVR: false,//Vr 状态
        flength: 0, // flengh
        camaralength: 1,//相机球内半径
        camaraMaxlength: 67,//相机球内最大半径
        aspect: 1,// 相机长宽比例
        aspectvr: 1,//vr 相机长宽比例
        istonchcontrol: true,// 触控是否开启
        tonchcontrol: null,//触控 对象
        tonchcontrolvr: null,//vr触控对象
        isdevicecontrol: false,//是否开启设备控制对象
        devicecontrol: null,//设备控制对象
        canvas: null,//画布容器
        canvasvr: null,//vr画布容器
        width: null,//容器宽高
        height: null,//容器高       
        renderer: null, //渲染器
        renderervr: null, //Vr渲染器
        geometry: null,// 球体模型
        texture: null,// 纹理
        material: null,//材质
        mesh: null, //网格 
        endedEvent: null, //播放结束事件
        loadstartEvent: null,//播放加载事件
        startplayEvent: null,//播放播放事件
        ready: function (obj) { },
    }
    var mastupdateProjectionMatrix = false;
    if (option.animateTimeLenght != undefined) {
        this.options.animateTimeLenght = option.animateTimeLenght
    }
    if (option.autoAnimate != undefined) {
        this.options.autoAnimate = option.autoAnimate
    }
    if (option.startplayEvent != undefined) {
        this.options.startplayEvent = option.startplayEvent
    }
    if (option.loadstartEvent != undefined) {
        this.options.loadstartEvent = option.loadstartEvent
    }
    if (option.endedEvent != undefined) {
        this.options.endedEvent = option.endedEvent
    }
    if (option.fov != undefined) {
        this.options.fov = option.fov
    }
    if (option.src != undefined) {
        this.options.src = option.src
    }
    if (option.flength != undefined) {
        this.options.flength = option.flength;
    }
    if (option.isVR != undefined) {
        this.options.isVR = option.isVR;
    }
    if (option.isdevicecontrol != undefined) {
        this.options.isdevicecontrol = option.isdevicecontrol;
    }
    if (option.istonchcontrol != undefined) {
        this.options.istonchcontrol = option.istonchcontrol;
    }
    if (option.autoplay != undefined) {
        this.options.autoplay = option.autoplay;
    }
    if (option.ready != undefined) {
        this.options.ready = option.ready;
    }
    var scope = this;
    // 初始化 模型
    var initGeometry = function () {
        scope.options.geometry = new THREE.SphereBufferGeometry(scope.options.camaraMaxlength, 32, 32)
        scope.options.geometry.scale(-1, 1, 1);//左右镜像处理 
    }()
    //初始化vedeo 
    var initVideo = function () {
        if (scope.options.video == null) {
            scope.options.video = document.createElement('video');
            scope.options.video.src = scope.options.src;
            scope.options.video.crossOrigin = "anonymous";
            scope.options.video.autoplay = scope.options.autoplay;
            scope.options.video.onloadstart = function () { loadStart() };
            scope.options.video.onplay = function () { startplay() };
            scope.options.video.onended = function () { playEnd() };
        }
    }();
    //初始化Texture
    var initTexture = function () {
        scope.options.texture = new THREE.VideoTexture(scope.options.video)
        scope.options.texture.minFilter = THREE.LinearFilter;
        scope.options.texture.magFilter = THREE.LinearFilter;
        scope.options.texture.format = THREE.RGBFormat;
    }()
    //初始化 Canvas
    var initCanvas = function () {
        if (isNullOrUndefined(scope.options.container)) {
            console.error(tag, "未指定容器元素1!")
            return;
        }
        scope.options.height = getHeight(scope.options.container);
        scope.options.width = getWidth(scope.options.container);
        scope.options.canvas = document.createElement('canvas');
        var cwidth = scope.options.width;
        if (scope.options.isVR) {
            cwidth = cwidth / 2;
        }
        scope.options.canvas.style = "float:left;height:" + scope.options.height + "px;width:" + cwidth + "px"
        scope.options.container.appendChild(scope.options.canvas);
        scope.options.canvasvr = document.createElement('canvas');
        scope.options.canvasvr.style = "float:left;height:" + scope.options.height + "px;width:" + scope.options.width / 2 + "px"
        scope.options.canvasvr.hidden = !scope.options.isVR;
        scope.options.container.appendChild(scope.options.canvasvr)

    }()
    // 初始化 Camara
    var initCamara = function () {
        scope.options.aspect = scope.options.width / scope.options.height;
        scope.options.aspectvr = scope.options.width / 2 / scope.options.height;
        if (scope.options.isVR) {
            scope.options.camera = new THREE.PerspectiveCamera(scope.options.fov, scope.options.aspectvr, 0.01, 1000);
        } else {
            scope.options.camera = new THREE.PerspectiveCamera(scope.options.fov, scope.options.aspect, 0.01, 1000);
        }
        scope.options.camera.position.set(0, 0, 1);
    }()
    //初始化 WebGLRenderer
    var initWebGLRenderer = function () {
        scope.options.renderer = new THREE.WebGLRenderer({ canvas: scope.options.canvas })
        scope.options.renderervr = new THREE.WebGLRenderer({ canvas: scope.options.canvasvr })
        var width = scope.options.width;
        if (scope.isVR) {
            width = width / 2;
        }
        scope.options.renderer.setPixelRatio(window.devicePixelRatio);
        scope.options.renderer.setSize(width, scope.options.height);
        scope.options.renderervr.setPixelRatio(window.devicePixelRatio);
        scope.options.renderervr.setSize(scope.options.width / 2, scope.options.height);
        scope.options.tonchcontrol = new THREE.OrbitControls(scope.options.camera, scope.options.renderer.domElement)
        scope.options.tonchcontrolvr = new THREE.OrbitControls(scope.options.camera, scope.options.renderervr.domElement)
        scope.options.devicecontrol = new THREE.DeviceOrientationControls(scope.options.camera)

    }();

    //初始化 Material
    var initMaterial = function () {
        scope.options.material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: scope.options.texture })
        scope.options.material.needsUpdate = true;

    }();
    // 初始化 Mesh
    var initMesh = function () {
        var ambient = new THREE.AmbientLight(0xffffffff);
        scene.add(ambient);
        scope.options.mesh = new THREE.Mesh(scope.options.geometry, scope.options.material);
        scene.add(scope.options.mesh);
        scope.options.mesh.position.set(0, 0, 0);
    }();
    //  controls.update();
    var animate = () => {
        requestAnimationFrame(animate)
        if (mastupdateProjectionMatrix) {
            scope.options.camera.updateProjectionMatrix();
            mastupdateProjectionMatrix = false;
        }
        controlcore();
        vrcore()
        scope.options.renderer.render(scene, scope.options.camera);
    }
    animate();
    var playEnd = function () { //播放结束
        if (scope.options.endedEvent != null) {
            scope.options.endedEvent();
        }
    }
    var startplay = function () {    // 可以播放 
        startAnimation();
        if (scope.options.loadReadyEvent != null) {
            scope.options.loadReadyEvent();
        }
    }
    var isfirst = true;
    var startAnimation = function () {
        if (scope.options.autoAnimate && isfirst) {
            isfirst = false;
            var timelength = scope.options.animateTimeLenght;
            scope.options.camera.position.set(0, scope.options.camaraMaxlength - 1, 1)
            scope.options.camera.rotateX(-cPi);
            let count = timelength / 40;
            let cposition = (scope.options.camaraMaxlength - 1) / count;
            let crotatex = cPi / count
            var i = 0, interval;
            var st = scope.options.istonchcontrol;
            scope.options.istonchcontrol = false;
            interval = setInterval(function () {
                i++;
                let s = scope.options.camaraMaxlength - 1 - cposition * i;

                scope.options.camera.rotateX(crotatex);
                scope.options.camera.position.set(0, s >= 0 ? s : 0, 1)

                scope.options.mesh.rotateY(crotatex * 2);

            }, 40);



            setTimeout(function () {
                clearInterval(interval);
                scope.options.istonchcontrol = st;
            }, timelength)

        }
    }

    var loadStart = function () {
        if (scope.options.loadstartEvent != null) {
            scope.options.loadstartEvent()
        }
    }
    function setFovFunc() {
        if (scope.options.fov >= 120) {
            scope.options.fov = 120;
        } else if (scope.options.fov <= 0) {
            scope.options.fov = 0;
        }
        scope.options.camera.fov = scope.options.fov;
        mastupdateProjectionMatrix = true;
    }

    function controlcore() {
        scope.options.tonchcontrol.enabled = scope.options.istonchcontrol;
        if (scope.options.istonchcontrol) {
            scope.options.tonchcontrol.update();
        }
        scope.options.devicecontrol.enabled = scope.options.isdevicecontrol
        if (scope.options.isdevicecontrol) {
            scope.options.devicecontrol.update();
        }
    }
    function cameraPosition(radius, scope) {
        let rx = scope.options.camera.rotation.x - Math.PI;
        let y = radius * Math.sin(rx);
        let z = Math.abs(radius * Math.cos(rx));
        scope.options.camera.position.set(0, y, z);
    }
    function vrcore() {
        if (scope.options.isVR) {
            if (scope.options.camera.aspect != scope.options.aspectvr) {
                scope.options.camera.aspect = scope.options.aspectvr;
                var cwidth = scope.options.width;
                if (scope.options.isVR) {
                    cwidth = cwidth / 2;
                }
                scope.options.canvas.style = "float:left;height:" + scope.options.height + "px;width:" + cwidth + "px"
                scope.options.canvasvr.hidden = false;
                scope.options.camera.updateProjectionMatrix()
            }
            scope.options.renderervr.render(scene, scope.options.camera);
        } else {
            if (scope.options.camera.aspect != scope.options.aspect) {
                scope.options.camera.aspect = scope.options.aspect;
                var cwidth = scope.options.width;
                scope.options.canvas.style = "float:left;height:" + scope.options.height + "px;width:" + cwidth + "px"
                scope.options.canvasvr.hidden = true;
                scope.options.camera.updateProjectionMatrix()
            }
        }
    }
    /**
     * 获取 VR 状态
     * */
    this.getVR = function () {
        return scope.options.isVR;
    }
    /**
     *  设置 VR
     * @param {boolean} isvr
     */
    this.setVR = function (isvr) {
        if (scope.options.isVR != isvr) {
            scope.options.isVR = !scope.options.isVR;
        }
    }
    /**
     * 获取FOV
     * */
    this.getFov = function () {
        return scope.options.fov;
    }
    /**
     * 设置FOV
     * @param {number} fov
     */
    this.setFov = function (fov) {
        scope.options.fov = fov;
        setFovFunc()
    }
    /**
     * 动态累加 FOV
     * @param {number} val
     */
    this.changeFov = function (val) {
        scope.options.fov += val;
        setFovFunc()
    }
    /**
     * 设置 视频源
     * @param {string} _src
     */
    this.setSrc = function (_src) {
        scope.options.src = _src;
        scope.options.video.src = scope.options.src;
        scope.options.video.play();
    }
    /**
     * 播放视频
     * */
    this.play = function () {
        scope.options.video.play();
    }
    /**
     * 暂停
     * */
    this.pause = function () {
        scope.options.video.pause();
    }
    /**
     * 重新播放
     * */
    this.replay = function () {
        scope.options.video.load();
    }
    /**
     * 获取当前播放时长 */
    this.getCurrentTime = function () {
        return scope.options.video.currentTime;
    }
    /**
     * 获取视频总时长
     * */
    this.getDuration = function () {
        return scope.options.video.duration;
    }
    /**
     * 设置这是陀螺仪 控制 开启
     * @param {boolean} bo
     */
    this.setDevicecontrol = function (bo) {
        if (!bo) {
            scope.options.tonchcontrol.object.quaternion.copy(scope.options.devicecontrol.object.quaternion)
        }
        scope.options.isdevicecontrol = bo;
    }

    this.rotateX = function (val) {
        let v = DuToRadian(val);
        if (v >= cPi) {
            scope.options.camera.rotation.x = cPi;

        } else if (v <= -cPi) {
            scope.options.camera.rotation.x = -cPi;
        }
        else {
            scope.options.camera.rotation.x = -v;
        }
        mastupdateProjectionMatrix = true;
    };

    /**
     * 设施 X轴 旋转
     * @param {number} val 度
     */
    this.setRotateX = function (val) {
        let v = scope.options.camera.rotation.x + -DuToRadian(val);

        if (v >= cPi) {
            scope.options.camera.rotateX(cPi - scope.options.camera.rotation.x);
        } else if (v <= -cPi) {
            scope.options.camera.rotateX(-cPi - scope.options.camera.rotation.x);
        }
        else {
            scope.options.camera.rotateX(-DuToRadian(val));
        }
        cameraPosition(radius, scope);
        mastupdateProjectionMatrix = true;

    };
    /**
     * 获取 x 轴旋转角度
     * */
    this.getRotateX = function () {

        return -RadianToDu(scope.options.camera.rotation.x);
    };
    /**
     * 设置 Y轴 旋转
     * @param {number} val
     */
    this.setRotateY = function (val) {
        scope.options.mesh.rotateY(DuToRadian(val));
        mastupdateProjectionMatrix = true;
    }
    this.rotateY = function (val) {
        scope.options.mesh.rotation.y = DuToRadian(val);
        mastupdateProjectionMatrix = true;
    }
    /**
     * 获取 Y 轴旋转角度
     * */
    this.getRotateY = function () {
        if (Math.abs(scope.options.mesh.rotation.x) > 3.14) {
            if (scope.options.mesh.rotation.y > 0) {
                return RadianToDu(Math.PI - scope.options.mesh.rotation.y);
            } else {
                return RadianToDu(-Math.PI - scope.options.mesh.rotation.y);
            }
        }
        else {
            return RadianToDu(scope.options.mesh.rotation.y);
        }
    };
    /**
    * 设置 Z轴 旋转
    * @param {number} val
    */
    this.setRotateZ = function (val) {
        scope.options.camera.rotateY(DuToRadian(val));
        mastupdateProjectionMatrix = true;
    }
    /**
    * 获取 Z 轴旋转角度
    * */
    this.getRotateZ = function () {
        return RadianToDu(scope.options.camera.rotation.z);
    };
    var canZ = true;
    /**
    *  设置相机 Z 轴的位置
    * @param {number} val
    */
    this.setCamraoTranslateZ = function (val) {
        scope.options.camaralength = scope.options.camaralength + val;

        if (scope.options.camaralength >= scope.options.camaraMaxlength) {
            val = scope.options.camaraMaxlength - scope.options.camaralength;
            scope.options.camaralength = scope.options.camaraMaxlength;
            if (canZ) {
                scope.options.camera.translateZ(val);
                canZ = false;
            }
        }
        else if (scope.options.camaralength <= 1) {
            val = -scope.options.camaralength;
            scope.options.camaralength = 1;
            if (canZ) {
                scope.options.camera.translateZ(val);
                canZ = false;
            }
        }
        else {
            canZ = true;
            scope.options.camera.translateZ(val);
        }
        mastupdateProjectionMatrix = true;

    }
    var cflength = 34;

    /**
    * 设置 Flenght轴 旋转
    * @param {number} val
    */
    this.setFLength = function (val) {
        if (val < 0 || val > 99)
            return;
        // var cflength = scope.options.flength;
        scope.options.flength = val;
        if (scope.options.flength <= 34) {
            scope.options.fov = 56 + scope.options.flength;
            scope.options.camera.position.set(0, 0, 1)
            setFovFunc();
            cflength = 34;
        }
        else if (scope.options.flength <= 67) {
            scope.options.fov = 90;

            setFovFunc()
            radius = scope.options.flength - 34;
            cameraPosition(radius, scope);
            cflength = scope.options.flength;
        } else {
            let cz = scope.options.flength - 69;
            scope.options.fov = 90 + cz
            setFovFunc()
            radius = scope.options.flength - 34;
            cameraPosition(radius, scope);
            cflength = scope.options.flength;
        }

    }
    /**
    * 获取 Flenght
    */
    this.getFlength = function () {
        return scope.options.flength;
    }
    scope.options.ready(scope);
}



