'use strict';
const Generator = require('yeoman-generator');
const commandExists = require('command-exists').sync;
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('skip-install-message', {
      desc: 'Skips the message after the installation of dependencies',
      type: Boolean
    });

    this.option('test-framework', {
      desc: 'Test framework to be invoked',
      type: String,
      defaults: 'mocha'
    });

    this.option('babel', {
      desc: 'Use Babel',
      type: Boolean,
      defaults: true
    });
  }

  initializing() {
    this.pkg = require('../../package.json');
    this.composeWith(
      require.resolve(`generator-${this.options['test-framework']}/generators/app`),
      { 'skip-install': this.options['skip-install'] }
    );
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to use ${chalk.red('generator-perfect')} generator!`));

    const prompts = [
      {
        type: 'list',
        name: 'features',
        message: 'Which additional features would you like to include?',
        choices: [
          {
            name: 'Less',
            value: 'includeLess',
            checked: true
          },
          {
            name: 'Sass',
            value: 'includeSass',
            checked: false
          }
        ]
      }
    ];

    return this.prompt(prompts).then(answers => {
      const features = answers.features;
      const hasFeature = feat => features && features.indexOf(feat) !== -1;
      this.includeLess = hasFeature('includeLess');
      this.includeSass = hasFeature('includeSass');
    });
  }

  writing() {
    this._writingFile();
    this._writingDir();
    this._writingMisc();
  }
  _writingFile() {
    this.fs.copy(this.templatePath('package.json'), this.destinationPath('package.json'));
    this.fs.copy(this.templatePath('favicon.ico'), this.destinationPath('favicon.ico'));
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('npmrc'), this.destinationPath('.npmrc'));
    this.fs.copy(this.templatePath('babelrc'), this.destinationPath('.babelrc'));
    this.fs.copy(
      this.templatePath('postcss.config.js'),
      this.destinationPath('postcss.config.js')
    );
    this.fs.copy(
      this.templatePath('webpack.common.js'),
      this.destinationPath('webpack.common.js')
    );
    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );
    this.fs.copy(
      this.templatePath('webpack.dev.js'),
      this.destinationPath('webpack.dev.js')
    );
    this.fs.copy(
      this.templatePath('webpack.dll.js'),
      this.destinationPath('webpack.dll.js')
    );
    this.fs.copy(
      this.templatePath('webpack.prod.js'),
      this.destinationPath('webpack.prod.js')
    );
    this.fs.copy(
      this.templatePath('webpack.server.js'),
      this.destinationPath('webpack.server.js')
    );
  }
  _writingDir() {
    this.fs.copy(this.templatePath('pages/**'), this.destinationPath('src/pages/'));
    this.fs.copy(this.templatePath('views/**'), this.destinationPath('src/views'));
  }
  _writingMisc() {
    mkdirp('src/components');
    mkdirp('src/utils');
    mkdirp('src/publish/lib');
    mkdirp('src/publish/images');
    mkdirp('src/publish/svgs');
  }

  install() {
    const hasYarn = commandExists('yarn');
    this.installDependencies({
      npm: !hasYarn,
      yarn: hasYarn,
      skipMessage: this.options['skip-install-message'],
      skipInstall: this.options['skip-install']
    });
  }
};
