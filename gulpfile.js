`use-strict`;

const
dirs = {
	src: `./src`,
	dist: `./dist`,
	npm: `./node_modules`
},
pkgs = {
	del: require(`del`),
	fs: require(`fs`),
	gulp: require(`gulp`),
	path: require(`path`),
	rename: require(`gulp-rename`)
};

pkgs.gulp.task(
	`clean`,
	callback => {
		let deletedPaths = pkgs.del.sync( pkgs.path.join(dirs.dist, `/*`) );

		if(deletedPaths.length > 0)
			console.log(
				`Deleted the following files and directories:\n`,
				deletedPaths.join(`\n`)
			);

		callback();
	}
);

pkgs.gulp.task(
	`copy:src`,
	() => pkgs.gulp
		.src(
			[
				pkgs.path.join(dirs.src, `**/*.php`)
			],
			{ base: dirs.src }
		)
		.pipe(
			pkgs.gulp.dest( dirs.dist )
		)
);

pkgs.gulp.task(
	`build`,
	pkgs.gulp
		.series(
			`clean`,
			`copy:src`
		)
);


pkgs.gulp.task(
	`default`,
	pkgs.gulp.series(`build`)
);


let globsToWatch = [
	dirs.src + `/**/*`,
	`README.md`
];
pkgs.gulp.task(
	`watch`,
	() => pkgs.gulp.watch(
		globsToWatch,
		(callback) => {
			console.clear();
			pkgs.gulp.series(
				`build`,
				() => console.log(`Watching changes in ${globsToWatch.join(', ')}...`)
			)();
			callback();
		}
	)
);
