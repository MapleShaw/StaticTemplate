module.exports=function(grunt){
    require('time-grunt')(grunt);//Grunt处理任务进度条提示

    grunt.initConfig({
        //默认文件目录在这里
        paths:{
            minZip:'./minZip',//输出的最终文件minZip里面
            less:'./css/less',//推荐使用Sass
            css:'./css', //若简单项目，可直接使用原生CSS，同样可以grunt watch:base进行监控
            js:'./js', //js文件相关目录
            images:'./images' //图片相关
        },
        buildType:'Build',
        pkg: grunt.file.readJSON('package.json'),
        archive_name: grunt.option('name') || 'StaticTemplate项目名称',//此处可根据自己的需求修改


        uglify:{
            options:{
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n', //js文件打上时间戳
                mangle: {
                    except: ['jQuery', 'bootstrap']
                }
            },
            dist: {
                 files: {
                     '<%= paths.minZip %>/js/min.v.js': '<%= paths.js %>/*.js'
                 }
            }
        },


        jshint: {
          // define the files to lint
          files: ['gruntfile.js', '<%= paths.js %>/*.js'],
          // configure JSHint (documented at http://www.jshint.com/docs/)
          options: {
              // more options here if you want to override JSHint defaults
            globals: {
              jQuery: true,
              console: true,
              module: true
            }
          }
        },


        //压缩最终Build文件夹
        compress:{
            main:{
                options:{
                    archive:'<%= archive_name %>-<%= grunt.template.today("yyyy") %>年<%= grunt.template.today("mm") %>月<%= grunt.template.today("dd") %>日<%= grunt.template.today("h") %>时<%= grunt.template.today("TT") %>.zip'
                },
                 files: [
                  
                  {expand: true, cwd: '', src: ['**'], dest: 'public/'}, // makes all src relative to cwd
                  
                ]
            }
        },


        //Less 预处理
        less: {
          admin: {
            options: {
              paths: ['<%= paths.less %>']
            },
            files: {
              '<%= paths.css %>/style.css':'<%= paths.less %>/reset.less'
            }
          }
        },


        //压缩 css
        cssmin:{
            options:{
                  keepSpecialComments: 0
              },
              compress:{
                    files:{
                     '<%= paths.minZip %>/css/min.style.css': [
                     '<%= paths.css %>/style.css'
                 ]
                 }
              }
        },



        //监听变化 默认grunt watch 监测所有开发文件变化
        watch:{
            options:{
                //开启 livereload
                livereload:true,
                //显示日志
                dateFormate:function(time){
                    grunt.log.writeln('编译完成,用时'+time+'ms ' + (new Date()).toString());
                    grunt.log.writeln('Wating for more changes...');
                }
            },
            //css
            less:{
                files:'<%= paths.less %>/*.less',
                tasks:['less:admin','cssmin']
            },
            css:{
                files:'<%= paths.css %>/*.css',
                tasks:['cssmin']
            },
            js:{
                 files:'<%= paths.js %>/*.js',
                 tasks:['uglify']
            },
            //若不使用Sass，可通过grunt watch:base 只监测style.css和js文件
            base:{
                files:['<%= paths.css %>/*.css','<%= paths.js %>/*.js','images/**'],
                tasks:['cssmin','uglify']
            }

        }

    });

  //输出进度日志
  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + '文件: '+filepath + ' 变动状态: ' + action);
  });

    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['cssmin','uglify']);
    grunt.registerTask('style', ['less:admin','cssmin']);//不能用less，The trick was that Grunt doesn't seem to like the repetition in names. 详情看stackoverflow的解释
    /*http://stackoverflow.com/questions/22285942/grunt-throw-recursive-process-nexttick-detected*/
    //执行 grunt bundle --最终输出的文件 < name-生成日期.zip > 文件
    //grunt.registerTask('bundle', ['clean:pre','copy:images', 'copy:main','cssmin','copy:archive', 'clean:post','htmlmin','compress',]);
    //执行 grunt publish 可以直接上传项目文件到指定服务器FTP目录

};