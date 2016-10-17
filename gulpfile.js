/*\
|*| Copyright/Copyleft : Edvins Antonovs 2016 <https://github.com/ummahusla>
|*| Date               : 16th October 2016
|*| License            : MIT <https://github.com/ummahusla/PotatoCSS/LICENSE.md>
|*| Library/Framework  : GULP <gulpjs.com> | Node.js <nodejs.org>
|*| Language           : Javascript
\*/

var isDevelopment = true;

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    less = require("gulp-less"),
    sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),
    minimiser = require("gulp-clean-css"),
    plumber = require("gulp-plumber"),
    del = require("del"),
    vinylPaths = require("vinyl-paths"),
    rename = require("gulp-rename"),
    beautify = require("gulp-cssbeautify");
    
var paths = {
    src : "src/",
    build : "dist/",
    dev : "test/"
};

if (isDevelopment) { paths.build = paths.dev; }

var plumberErrorHandler = function( err ) { console.log("Plumber caught:\n" + err); this.emit("end"); },
    writeToBuild = function ( stream ) {
        return stream
        .pipe( autoprefixer( { browsers : "last 2 versions" } ) )
        .pipe ( beautify() )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest(paths.build + "css/") )
        .pipe( rename( { extname : ".min.css" } ) )
        .pipe( minimiser() )
        .pipe( gulp.dest(paths.build + "css/") );
    };

gulp.task("__build-task-sass", function () {
    return writeToBuild(
        gulp
            .src( paths.src + "sass/*.scss" )
            .pipe( plumber( plumberErrorHandler ) )
            .pipe( sourcemaps.init() )
            .pipe( sass( { outputStyle : "expanded" } ) )
    );
});

gulp.task("__build-task-less", function () {
    return writeToBuild(
        gulp
            .src( paths.src + "less/*.less" )
            .pipe( plumber( plumberErrorHandler ) )
            .pipe( sourcemaps.init() )
            .pipe( less() )
    );
});

gulp.task("__build-task-clean", function () {
    var path = paths.build;
    if (isDevelopment) paths += "css/";
    console.log("Cleaning build folder \"" + path + "\"");
    return gulp
        .src( paths.dev+"css/", { read : false } )
        .pipe( vinylPaths( del ) );
});

/* Commands */

/* Clean */

gulp.task("__clean", ["__build-task-clean"]);

/* Build */

gulp.task("__build", ["__build-sass", "__build-less"]);
gulp.task("__build-sass", ["__build-task-clean", "__build-task-sass"]);
gulp.task("__build-less", ["__build-task-clean", "__build-task-less"]);

/* Watch */

gulp.task("__watch", ["__watch-sass", "__watch-less"]);
gulp.task("__watch-sass", function () {
    gulp.watch(paths.src + "sass/**/*.scss", ["__build-sass"]);
});
gulp.task("__watch-less", function () {
    gulp.watch(paths.src + "less/**/*.less", ["__build-less"]);
});

/* Default and Help */

gulp.task("__help", function () {
    console.log("o===========o\no PotatoCSS o\no===========o\n\nCommands\n========\n\"gulp __help\" - brings you back to this screen.\n\n\"gulp __clean\" - cleans the build directory\n\n\"gulp __build\" - builds files from source.\n\"gulp __build-sass\" - executes \"gulp __build\" only for source SASS files.\n\"gulp __build-less\" - executes \"gulp __build\" only for source LESS files.\n\n\"gulp __watch\" - watches source files for change and builds them if they do.\n\"gulp __watch-sass\" - executes \"gulp __watch\" only for source SASS files.\n\"gulp __watch-less\" - executes \"gulp __watch\" only for source LESS files.");
});

gulp.task("default", function () {
      console.log("PotatoCSS\ntype \"gulp __help\" for a list commands and help");
});