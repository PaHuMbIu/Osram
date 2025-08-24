const gulp = require('gulp');
const stylus = require('gulp-stylus');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

// Пути
const paths = {
	html: {
		src: 'src/html/**/*.html',
		dest: 'build/'
	},
	css: {
		src: 'src/css/**/*.styl',
		dest: 'build/css/'
	},
	js: {
		src: 'src/js/**/*.js',
		dest: 'build/js/'
	}
};

// Сервер
function serve() {
	browserSync.init({
		server: {
			baseDir: 'build'
		}
	});
}

// HTML
function html() {
	return gulp.src(paths.html.src)
		.pipe(gulp.dest(paths.html.dest))
		.pipe(browserSync.stream());
}

// CSS
function css() {
	return gulp.src(paths.css.src)
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.css.dest))
		.pipe(browserSync.stream());
}

// JS
function js() {
	return gulp.src(paths.js.src)
		.pipe(gulp.dest(paths.js.dest))
		.pipe(browserSync.stream());
}

// Вотчер
function watch() {
	gulp.watch(paths.html.src, html);
	gulp.watch(paths.css.src, css);
	gulp.watch(paths.js.src, js);
}

// Сборка
const build = gulp.series(gulp.parallel(html, css));

// Экспорты
exports.build = build;
exports.default = gulp.series(build, gulp.parallel(serve, watch));




