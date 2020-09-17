const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const sassGlob = require("gulp-sass-glob");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

gulp.task("ejs", cb => {
  return gulp
    .src([
      "./src/ejs/**/*.ejs",
      "!./src/ejs/_includes/**/*",
      "!./src/ejs/**/_*.ejs"
    ])
    .pipe(ejs())
    .pipe(rename({ extname: "" }))
    .pipe(gulp.dest("./orepress/__html__"))
    .pipe(browserSync.stream());
});

gulp.task("sass", cb => {
  return gulp
    .src("./src/scss/app.scss")
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "compressed",
        indentType: "tab",
        indentWidth: 1
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer({ grid: true }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./orepress/assets/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", cb => {
  return gulp
    .src([
      // Common
      "./src/js/app.js",
      // Pages
      // "./src/js/pages/*.js",
      // Main
      // "./src/js/main.js"
    ])
    .pipe(sourcemaps.init())
    .pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./orepress/assets/js"))
    .pipe(browserSync.stream());
});

gulp.task("js:vendor", cb => {
  return gulp
    .src([
      // "./src/js/vendor/jquery-3.4.1.min.js",
      // "./src/js/vendor/gsap/gsap.min.js",
      "./src/js/vendor/*.js"
    ])
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest("./orepress/assets/js"));
});

gulp.task("serve", cb => {
  browserSync.init({
    server: {
      baseDir: "./orepress",
      directory: true
    },
    port: 9999,
    ui: false
  });
  gulp.watch("./src/ejs/**/*", gulp.task("ejs"));
  gulp.watch("./src/scss/**/*", gulp.task("sass"));
  gulp.watch("./src/js/**/*", gulp.task("js"));
});

gulp.task("build", gulp.parallel("sass", "js:vendor", "js", "ejs"));
gulp.task("start", gulp.series("build", "serve"));