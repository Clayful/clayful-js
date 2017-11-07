"use strict";

const _ = require('lodash');
const gulp = require('gulp');
const rename = require('gulp-rename');
const mustache = require('gulp-mustache');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const models = require('clayful-lib-spec/data/spec.json');

const nodeAPIs = _.cloneDeep(models);
const jsAPIs = _.cloneDeep(models.map(m => {

	m.apis = m.apis.filter(a => a.access.public);

	return m;

}).filter(m => m.apis.length));

const clients = {
	node: nodeAPIs,
	js:   jsAPIs,
};

const ext = '.js';

gulp.task('clean', () => {

	const clientNames = _.keys(clients);

	return gulp.src(clientNames.map(clientName => `./lib/models-${ clientName }/*`), { read: false })
		.pipe(clean());

});

gulp.task(`models`, ['clean'], () => {

	_.forEach(clients, (spec, clientName) => {

		_.forEach(spec, model => {

			gulp.src('./build/model.mustache')
				.pipe(mustache(model))
				.pipe(rename(path => {
					path.basename = model.modelName;
					path.extname = ext;
				}))
				.pipe(gulp.dest(`./lib/models-${ clientName }`));

		});

	});

});

gulp.task(`binder`, ['models'], () => {

	_.forEach(clients, (spec, clientName) => {

		gulp.src('./build/binder.mustache')
			.pipe(mustache(spec))
			.pipe(rename(path => {
				path.basename = 'index';
				path.extname = ext;
			}))
			.pipe(gulp.dest(`./lib/models-${ clientName }`));

	});

});

gulp.task('compile', ['binder'], () => {

	browserify('./lib/client-js')
		.transform('babelify', { presets: ['es2015'] })
		.bundle()
		.pipe(source('index.js'))
		.pipe(buffer())
		.pipe(rename('clayful-js.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest('./dist'));

	[
		'request-jquery',
		'request-axios',
	].forEach(name => {

		browserify(`./lib/plugins/${ name }`)
			.transform('babelify', { presets: ['es2015'] })
			.bundle()
			.pipe(source('index.js'))
			.pipe(buffer())
			.pipe(rename(`${ name }.js`))
			.pipe(gulp.dest('./dist'))
			.pipe(uglify())
			.pipe(rename({ extname: '.min.js' }))
			.pipe(gulp.dest('./dist'));

	});

});

gulp.task('default', ['compile']);