const gulp = require('gulp'); // npm install --save-dev gulp
const imagemin = require('gulp-imagemin'); // npm install --save-dev gulp-imagemin
const uglify = require('gulp-uglify'); // npm install --save-dev gulp-uglify
const sass = require('gulp-sass'); // npm install --save-dev gulp-sass
const concat = require('gulp-concat') // npm install --save-dev gulp-concat
const rename = require('gulp-rename') // npm install --save-dev gulp-rename
/*
  -- TOP LEVEL FUNCTION --
  gulp.task - Define tasks
  gulp.src - Point tofiles to use
  fulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/



// Logs Message
function message(done){
  console.log('Gulp is running...');
  done();
}

// Error log
function errorLog(error){
  console.log(error.toString());
  this.emit('end');
}

// Copy All HTML files
function copyHtml(done){
  gulp.src('src/*.html')
      .pipe(gulp.dest('dist'));
  done();
}

// Optimize Images
function imageMin(done){
  gulp.src('src/images/*')
      .pipe(imagemin())
      .on('error',errorLog)
      .pipe(gulp.dest('dist/images'));
  done();
}

// Minify JS
function minifyJs(done)
{
  gulp.src('src/js/*.js')
      .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('dist/js'));
  done();
}

// Concat scripts
function combainJs(done)
{
  gulp.src('src/js/*.js')
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
  done();
}


// Compile sass
function sassToCss(done){
  gulp.src('src/sass/*.scss')
      .pipe(sass().on('error',errorLog))
      .pipe(gulp.dest('dist/css'));
  done();
}

// Watch files
function watch_files() {
  gulp.watch('src/sass/*.scss',sassToCss );
  gulp.watch('src/js/*.js' ,minifyJs );
}

gulp.task('message', message);
gulp.task('copyHtml',copyHtml);
gulp.task('imageMin',imageMin);
gulp.task('minifyJs',minifyJs);
gulp.task('sassToCss',sassToCss);
gulp.task('combainJs',combainJs);

gulp.task('default', gulp.parallel(message,copyHtml,imageMin,minifyJs,sassToCss) );
gulp.task('watch',gulp.series(watch_files));
