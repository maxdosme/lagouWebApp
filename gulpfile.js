
// 引入gulp
var gulp = require('gulp');
// 引入一个转换模块所有模块都通过$符引入需要加入()实例化
var $ = require('gulp-load-plugins')();
//  引入open模块
var open = require('open');

//  全局变量，定义目录路径
var app = {
    srcPath: 'src/',         //源代码
    devPath: 'bilud/',       //整合的开发环境放置
    prdPath: 'dist/'         //生产、部署目录
};

//  使用glup放置文件
gulp.task('lib',function (){
    //  读取文件
    gulp.src('bower_components/**/*.js')

    //  操作文件：写入文件
    .pipe(gulp.dest(app.devPath + 'vendor'))
    .pipe(gulp.dest(app.prdPath + 'vendor'));
});

//  创建html
gulp.task('html', function (){
    gulp.src(app.srcPath + '**/*.html')

    //  操作文件：写入文件
    .pipe(gulp.dest(app.devPath))
    .pipe(gulp.dest(app.prdPath));
})

//  json数据（无后端）
gulp.task('json',function (){
    //  读取文件
    gulp.src(app.srcPath + 'data/**/*.json')

    //  操作文件：写入文件
    .pipe(gulp.dest(app.devPath + 'data'))
    .pipe(gulp.dest(app.prdPath + 'data'));
});

//  css(less引入)
gulp.task('less', function (){
    //  读取文件
    gulp.src(app.srcPath + 'style/index.less')

    //  操作文件：写入文件使用$.引入less
    .pipe($.less())
    .pipe(gulp.dest(app.devPath + 'css'))

    //  用于生产环境时，需要压缩一下
    .pipe($.cssmin())
    .pipe(gulp.dest(app.prdPath + 'css'))
});

//  js
gulp.task('js', function (){
    gulp.src(app.srcPath + 'script/**/*.js')

    //  合并文件生成index.js
    .pipe($.concat('index.js'))
    //  写入开发目录
    .pipe(gulp.dest(app.devPath + 'js'))
    //  发布到生产环境时，压缩文件
    .pipe($.uglify())
    //  发布到生产环境
    .pipe(gulp.dest(app.prdPath + 'js'))
});

//  img
gulp.task('img', function (){
    gulp.src(app.srcPath + 'image/**/*')
    //  放置到目标
    .pipe(gulp.dest(app.devPath + 'image'))
    //  压缩图片
    .pipe($.imagemin())
    //  发布
    .pipe(gulp.dest(app.prdPath + 'image'))
});

//  gulp总任务项目搭建
gulp.task('build', ['img', 'js', 'less', 'lib', 'html', 'json']);



//  清除
gulp.task('clean', function (){
    gulp.src([app.devPath, app.prdPath])
    .pipe($.clean());
});


//  自动化服务器
gulp.task('serve', function (){
    //  启动服务器
    $.connect.server({
        root: [app.devPath],                  //  读取路径
        livereload: true,                      //  高级浏览器自动刷新功能(IE不支持)
        port: 8081,                          //  端口
    });
    //  优化
    open('http://localhost:8081');          //  自动打开浏览器
});