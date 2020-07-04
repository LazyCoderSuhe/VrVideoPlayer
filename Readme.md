# <center> VR Player 使用文档
***
							作者:LazyCoder 日期:2020年6月16日

### VRVideoPlayer
项目基础依赖于Three.js ,同时使用了其中俩个插件 OrbitControls,DeviceOrientationControls,单已经对源代码进行了更改

> 实例: \
> 1 引用 \
> * three/build/three.js,
> * controls/OrbitControls.js,
> * controls/DeviceOrientationControls.js
> * VrVideo.js

##### 代码:
	<script>
        var vrvideo = new VRVideoPlayer({
            eid: "div",
            src: "2.mp4",
            istonchcontrol:true,
            isdevicecontrol: false
        });

    </script>

#### 属性

| 属性名称   |类型  |默认值  | 说明      |
|------------|------|--------|-----------|
|fov|number|84|相机 Fov  50 - 120|
|src|string|必填|视频播放地址|
|flength|number|50| |
|autoAnimate|bool|false| 旋转进入动画|
|isVR|bool |false| 是否 开启VR|
|autoplay|bool|false|自动播放,手机端无效|
|isdevicecontrol|bool| false| 是否开启 陀螺仪|
|istonchcontrol|bool|false|是否开启 手指控制|
|autoAnimate|bool|true|启动播放动画|
|animateTimeLenght|number|2000| 一毫米为单位 |

#### 事件

| 名称   |参数  | 说明      |
|------------|------|--------|
|startplayEvent|null|开始播放|
|loadstartEvent|null|开始加载|
|endedEvent|null|播放结束|



#### 方法

| 方法名称|参数|说明|
|-----|----|----|
|getVR||获取 VR 状态|
|setVR|true/false|设置 VR|
|getFov||获取FOV|     
|setFov|50-120|设置FOV|
|changeFov|- + number|动态累加 FOV|
|setSrc|string|设置 视频源|
|play||播放视频|
|pause||暂停|
|replay||重新播放|
|getCurrentTime||获取当前播放时长|
|getDuration||获取视频总时长|
|setDevicecontrol|true/false|设置这是陀螺仪 控制 开启|
|setRotateX|- + number|设施 X轴 旋转|
|getRotateX||获取 x 轴旋转角度|
|setRotateY|- + number| 设置 Y轴 旋转|
|getRotateY||获取 Y 轴旋转角度|
|setRotateZ|- + number|设置 Z轴 旋转|
|getRotateZ|| 获取 Z 轴旋转角度|
|setCamraoTranslateZ|- + number|设置相机 Z 轴的位置|
|setFLength|- + number|设置 Flenght轴 旋转|
|getFlength||获取 Flenght|



## 插件
### 1. VRPlayButton.js
                            作者:李守峰 2020年6月18日
> 移动端无法自动自动播放可以将 autoplay :false ,插件.VRPlayButton
> 可在VrVideoPlayer 中显示 一个播放按钮

##### 使用方法:
      var playbutton = new VRVideoPlayer.PlayButton(vrvideo, {
            size :70,
      });


#### 属性

| 属性名称   |类型  |默认值  | 说明      |
|------------|------|--------|-----------|
|videoplay|VRVideoPlayer||播放器的引用|
|options.playbtn_size| number|70| 播放图片大小|
|options.src|string|"./img/play.png"| 图片地址|
 
#### 事件

| 名称   |参数  | 说明      |
|------------|------|--------|
|callback|undefined|点击回调事件|
### 1. VRPlayJoystick.js
                              作者:李守峰 , LazyCoder 2020年7月4日 
 > 遥感控制 相机 X Y 轴变换
##### 使用方法:
      var VRPlayJoystick = new VRVideoPlayer.VRPlayJoystick(vrvideo, {
                maxdiv_display: false
            });






   
# bug 修复 
* <span style = "color:green"> setSrc : option 未定义问题 
* <span style = "color:green">  修改 setRotateX 是 编译不正确问题

