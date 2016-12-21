"use strict";

const _ = require('lodash');
const gulp = require('gulp');
const rename = require('gulp-rename');
const mustache = require('gulp-mustache');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const apis = require('clayful-lib-spec/data/api.json');
const aliases = require('clayful-lib-spec/data/aliases.json');

// Change arguments to string and add aliases
apis.forEach(a => {

	_.forEach(aliases, (v, k) => {

		a.arguments = '[' + a.arguments.map(a => `'${ a }'`).join(", ") + ']';

		if (!a.method.includes(k)) return;

		a.aliases = (a.aliases || []).concat(v.map(alias => a.method.replace(k, alias)));

	});

});

const toModels = apis => _.uniq(apis.map(a => a.className)).map(className => ({
	className,
	modelName: _.camelCase(className)
}));

const groupByModel = apis => apis.reduce((o, a) => {

	o[a.modelName] = (o[a.modelName] || []).concat(a);

	return o;

}, {});

const nodeAPIs = _.cloneDeep(apis);
const jsAPIs = _.cloneDeep(apis.filter(a => a.access.public));

const clients = {
	node: {
		apis:    nodeAPIs,
		models:  toModels(nodeAPIs).sort((a, b) => a.modelName.localeCompare(b.modelName)),
		byModel: groupByModel(nodeAPIs)
	},
	js:   {
		apis:    jsAPIs,
		models:  toModels(jsAPIs).sort((a, b) => a.modelName.localeCompare(b.modelName)),
		byModel: groupByModel(jsAPIs)
	},
};

const ext = '.js';

gulp.task(`models`, () => {

	_.forEach(clients, (spec, clientName) => {

		_.forEach(spec.byModel, (apis, modelName) => {

			gulp.src('./build/model.mustache')
				.pipe(mustache({
					modelName: modelName,
					className: _.upperFirst(modelName),
					methods:   apis
				}))
				.pipe(rename(path => {
					path.basename = modelName;
					path.extname = ext;
				}))
				.pipe(gulp.dest(`./lib/models-${ clientName }`));

		});

	});

});

gulp.task(`binder`, () => {

	_.forEach(clients, (spec, clientName) => {

		gulp.src('./build/binder.mustache')
			.pipe(mustache({ models: spec.models }))
			.pipe(rename(path => {
				path.basename = 'index';
				path.extname = ext;
			}))
			.pipe(gulp.dest(`./lib/models-${ clientName }`));

	});

});

gulp.task('compile:js', ['models', 'binder'], () => {

	browserify('./lib/client-js')
		.transform('babelify', { presets: ['es2015'] })
		.bundle()
		.pipe(source('index.js'))
		.pipe(buffer())
		.pipe(rename('clayful.js'))
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

gulp.task('default', ['models', 'binder']);