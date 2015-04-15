'use strict';

module.exports = {
    app: {
        title: 'Blackbelt',
        description: 'A web app for karate dojos.',
        keywords: 'MongoDB, Express, AngularJS, Node.js'
    },
    port: process.env.PORT || 3000,
    templateEngine: 'swig',
    sessionSecret: 'MEAN',
    sessionCollection: 'sessions',
    assets: {
        lib: {
            css: [
                'public/lib/bootstrap/dist/css/bootstrap.css',
                'public/lib/bootstrap-social/bootstrap-social.css',
                'public/lib/font-awesome/css/font-awesome.css',
                'public/lib/open-sans-fontface/open-sans.css',
                'public/lib/bootstrap-material-design/dist/css/material.css',
                'public/lib/bootstrap-material-design/dist/css/ripple.css'
            ],
            js: [
                'public/lib/angular/angular.js',
                'public/lib/angular-resource/angular-resource.js',
                'public/lib/angular-cookies/angular-cookies.js',
                'public/lib/angular-animate/angular-animate.js',
                'public/lib/angular-touch/angular-touch.js',
                'public/lib/angular-sanitize/angular-sanitize.js',
                'public/lib/angular-ui-router/release/angular-ui-router.js',
                'public/lib/angular-ui-utils/ui-utils.js',
                'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                'public/lib/jquery/dist/jquery.js',
                'public/lib/bootstrap/dist/js/bootstrap.js',
                'public/lib/moment/moment.js',
                'public/lib/angular-moment/angular-moment.js',
                'public/lib/livereload-js/dist/livereload.js',
                'public/lib/videogular/videogular.js',
                'public/lib/videogular-controls/vg-controls.js',
                'public/lib/videogular-overlay-play/vg-overlay-play.js',
                'public/lib/videogular-poster/vg-poster.js',
                'public/lib/videogular-buffering/vg-buffering.js',
                'public/lib/angular-payments/lib/angular-payments.js',
                'public/lib/ng-file-upload/angular-file-upload-all.js',
                'public/lib/bootstrap-material-design/dist/css/material.js',
                'public/lib/bootstrap-material-design/dist/css/ripple.js'
            ]
        },
        css: [
            'public/modules/**/css/*.css'
        ],
        js: [
            'public/config.js',
            'public/application.js',
            'public/modules/*/*.js',
            'public/modules/*/*[!tests]*/*.js'
        ],
        tests: [
            'public/lib/angular-mocks/angular-mocks.js',
            'public/modules/*/tests/*.js'
        ]
    }
};