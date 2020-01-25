import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';

// Loading gulp plugins dynamically

const p = loadPlugins({
    pattern: ['gulp-*', 'gulp.*', 'vinyl-ftp', 'run-sequence', 'path', 'del']
});

gulp.task('clean', () =>
    p.del('build')
);

gulp.task('move', () =>
    gulp.src(['app/www/**/*', 'app/config.xml', 'icon.png', 'splash.png'])
        .pipe(gulp.dest('build'))
);

gulp.task('icons', () =>
    gulp.src('res/**/*')
        .pipe(gulp.dest('build/res'))
);

gulp.task('zip', () =>
    gulp.src('build/**')
        .pipe(p.zip('build.zip'))
        .pipe(gulp.dest('./'))
);

gulp.task('default', done => p.runSequence('clean', 'move', 'icons', 'zip', done));
