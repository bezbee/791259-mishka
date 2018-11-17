"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var del = require("del");
var htmlmin = require("gulp-htmlmin");
var uglify = require('gulp-uglify');

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**",
    "source/img/**",
    "source/js/**",
    "source/*.html"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("copy-html", function () {
  return gulp.src(
    "source/*.html"
  , {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean-js", function () {
  return del("build/js/*.js");
});

gulp.task("copy-js", function () {
  return gulp.src(
    "source/js/**"
  , {
    base: "source"
  })
  .pipe(gulp.dest("build/"));
});

gulp.task("clean-html", function () {
  return del("build/*.html");
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("min-js", function () {
      return gulp.src("build/js/*.js")
       .pipe(uglify())
       .pipe(rename(function (path) {
         path.basename +="-min";
       }))
       .pipe(gulp.dest("build/js/"));
});

gulp.task("min-html", function (){
  return gulp.src("build/*.html")
  .pipe(htmlmin({collapseWhitespace: true }))
  .pipe(gulp.dest("build/"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.task ("refresh", function (done) {
    server.reload();
    done();
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("clean-html", "copy-html", "min-html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("clean-js", "copy-js", "min-js", "refresh"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series("clean", "copy", "css", "min-js", "min-html"));
gulp.task("start", gulp.series("build", "server"));
