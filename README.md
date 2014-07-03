#StaticTemplate 静态模版自动化工具

##项目文件结构：
````
newProject/
|
|-----build //最终生成的纯净文件夹等待被打包
|       
|       |-css
|           |-min.style.css //  最终生成的为压缩版本的css
|       |-js
|           |-min.base.js //  最终生成的为压缩版本的js
|           |-other.js //  其他脚本
|       |-images //压缩过的图片，目前配置文件里面没有指定
|
|       |-favicon.ico //  静态页的ico
|       |-index.html
|       |-README.md //  附上MD文档
|       |-此处根据项目需求，引入需要的文件
|
|-----css //  样式表开发目录
|   |-less //  css预编译根据自己喜好选择
|       |- reset.less  //  此处可用normalize.css样式，也可以根据项目需求自定义
|       |- style.less // 此处为Less基础文件 ，在此处根据需求@import 样式
|   |-style.css //  Less编译处理生成的样式表为style.css，也可直接编辑此样式表
|
|-----js //JavaScript相关
|   |-base.js // 基础样式在这里，最终压缩为min.v.js
|
|-----images // 图片
|
|-----minZip //压缩后css、js、images等集合
|           |-css
|           |-js
|           |-images
|
|-----node_modules / // npm安装依赖包所在文件夹
|
|-----favicon.ico //  静态页的ico
|-----index.html
|-----.gitignore // 默认使用git，配置好gitignore文件
|-----Gruntfile.js // grunt配置文件 建议先阅读配置
|-----package.json //grunt依赖包配置文件

````
###先把整个项目clone到本地
````
git clone https://github.com/MapleShaw/StaticTemplate.git
````
###安装nodeJS的配置
安装前可以先看下package.json，根据自己需要修改
````
npm install
````
项目名称啊版本号啊作者啊是吧，看着舒服点
````
{
  "name": "StaticTemplate",
  "version": "0.0.2",
  "author": "MapleShaw",
  "devDependencies": {
    "grunt": "~0.4.2",
    "grunt-contrib-compress": "~0.9.1",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-contrib-concat": "~0.4.0",
    "grunt-contrib-cssmin": "~0.10.0",
    "grunt-contrib-copy": "~0.5.0",
    "grunt-contrib-less": "~0.11.2",
    "grunt-contrib-watch": "~0.6.1",
    "grunt-contrib-uglify": "~0.5.0",
    "time-grunt": "^0.3.2"
  }
}
````

###Grunt 配置（这个比较蛋疼）
grunt的插件很多，可以狂戳 ：[Grunt的中文官网](http://gruntjs.cn/)

###css预编译和压缩

    less cssmin

###js的排错和压缩

    jshint uglify
    
###项目打包
项目打包前先选择性的复制所需文件到build再整体压缩

    copy compress//

###自定义Grunt任务

    grunt.registerTask('package', ['copy','compress']);//只需直接执行 grunt package
    
###文件监听

    grunt watch
    
可监听所有的开发目录下.less,.css,.js的变化，自动编译压缩。

可以单独使用`grunt watch:base`进行普通监听js目录下所有文件和css/style.css。

使用`grunt watch:less`或者`grunt watch:css`分别监听.less和.css文件。

###此模板目前作为己用
效仿自：[《让前端工作更快、更智能:利用StaticPage自动化工作流》](http://luolei.org/2014/03/front-end-dev-with-grunt-staticpage-workflow/)