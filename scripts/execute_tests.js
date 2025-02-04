var gulp = require('gulp'),
    gutil = require('gulp-util'),
    cucumber = require('gulp-cucumber'),
    argv = process.argv.slice(2),
    minimist = require('minimist'),
    report = require('multiple-cucumber-html-reporter'),
    mkdirp = require('mkdirp'),
    cucumberOptionsCatalog = {
        string: 'tags',
        default: {
            'tags': 'not @ignore'
        }
    };
argv.push("--tags");
argv.push("not @ignore");

var cucumberOptions = minimist(argv, cucumberOptionsCatalog);

gulp.task('create:html-report:folder', function(done) {
    mkdirp('html-report').then(function(){
        done();
    }).catch(function(err){
        done(err)
    })
});
gulp.task('create:target:folder', function(done) {
    mkdirp('target').then(function(){
        done();
    }).catch(function(err){
        done(err)
    })
});

gulp.task('cucumber:default', function(done) {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    var cucumberFinalOptions = {
        'steps': '*features/step_definitions/*.js',
        'support': '*features/support/*.js',
        'format': ['json:target/resultTESTS.json'],
        'emitErrors': true,
        'tags': cucumberOptions.tags
    };
    gulp.src('features/features/**/*.feature')
        .pipe(cucumber(cucumberFinalOptions))
        .on('error', function(error) {
            // we have an error
            console.log(error);
            done();
        }).on('end', function() {
            // in case of success
            done();
        });
});
gulp.task('cucumber', gulp.series('create:target:folder', 'create:html-report:folder', 'cucumber:default'));

gulp.task('generate:report', function() {
    return report.generate({
        jsonDir: './target/',
        reportPath: './html-report/'
    });
});

gulp.task('cucumberTestsNightly', gulp.series('cucumber', 'generate:report'));
