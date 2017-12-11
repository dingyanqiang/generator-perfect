const Generator = require('yeoman-generator');
// Const commandExists = require('command-exists').sync;
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const path = require('path');
const urllib = require('urllib');

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
  }
  initializing() {
    console.log('this is initializing');
    // 'generator-perfect'
    let done = this.async();
    this.pkg = require(path.join(__dirname, '../../package.json'));
    this.log(chalk.yellow('正在检查更新...'));

    urllib.request(
      'http://registry.npmjs.org/generator-perfect/latest',
      function (err, data, res) {
        if (err || res.statusCode != 200) {
          this.log(chalk.red('检查更新出错'));
        } else {
          data = JSON.parse(data.toString());
          if (data.version !== this.pkg.version) {
            this.log(
              '发现新版本：' +
              chalk.red(data.version) +
              ', 当前版本：' +
              chalk.yellow(this.pkg.version) +
              '.'
            );
            this.log('版本有更新，建议更新：npm install -g generator-perfect');
          } else {
            this.log('当前版本为最新版本');
          }
        }
        done();
      }.bind(this)
    );
  }
  _getDefaultProjectName() {
    function parseMojoName(name) {
      return name.replace(/\b(\w)|(-\w)/g, m => {
        return m.toUpperCase().replace('-', '');
      });
    }
    const projectName = path.basename(process.cwd());
    return parseMojoName(projectName);
  }
  prompting() {
    this.log(yosay(`${chalk.cyan.bold('Welcome to use perfect generator!')}`));
    const projectName = this._getDefaultProjectName();
    const prompts = [
      {
        type: 'list',
        name: 'projectType',
        message: '请选择你需要的项目类型',
        choices: [
          {
            name: 'React',
            value: 'react'
          },
          {
            name: 'Vue',
            value: 'vue'
          },
          {
            name: 'PC',
            value: 'pc'
          },
          {
            name: 'H5',
            value: 'h5'
          }
        ]
      },
      {
        type: 'input',
        name: 'projectName',
        message: 'Name of Project?',
        default: projectName
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author Name:',
        default: this.user.git.name() || ''
      },
      {
        type: 'input',
        name: 'email',
        message: 'Author Email:',
        default: this.user.git.email() || ''
      },
      {
        type: 'input',
        name: 'version',
        message: 'Version:',
        default: '1.0.0'
      },
      {
        type: 'list',
        name: 'styleType',
        message: '选择CSS预处理器?',
        choices: [
          {
            name: 'Less',
            value: 'less',
            checked: true
          },
          {
            name: 'Sass',
            value: 'scss',
            checked: false
          },
          {
            name: 'Css',
            value: 'css',
            checked: false
          }
        ]
      }
    ];
    return this.prompt(prompts).then(answers => {
      this.answers = answers;
    });
  }

  writing() {
    this._writingProjectFrame();
    this._writingProjectConfigFile();
    this._writingPageFile();
    this.config.defaults(this.answers);
  }
  _writingProjectFrame() {
    mkdirp('src/pages');
    mkdirp('src/components');
    mkdirp('src/utils');
    mkdirp('src/publish/lib');
    mkdirp('src/publish/images');
    mkdirp('src/publish/svgs');
  }
  _writingProjectConfigFile() {
    this.fs.copy(this.templatePath('favicon.ico'), this.destinationPath('favicon.ico'));
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('README.md'), this.destinationPath('README.md'));
    this.fs.copy(this.templatePath('babelrc'), this.destinationPath('.babelrc'));
    this.fs.copy(
      this.templatePath('postcss.config.js'),
      this.destinationPath('postcss.config.js')
    );
    this.fs.copy(this.templatePath('views/**'), this.destinationPath('src/templates'));
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('webpack.dev.js'),
      this.destinationPath('webpack.dev.js'),
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('webpack.common.js'),
      this.destinationPath('webpack.common.js'),
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('webpack.dll.js'),
      this.destinationPath('webpack.dll.js'),
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('webpack.prod.js'),
      this.destinationPath('webpack.prod.js'),
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('webpack.server.js'),
      this.destinationPath('webpack.server.js'),
      this.answers
    );
  }
  _writingPageFile() {
    let { projectType, styleType } = this.answers;
    this.fs.copyTpl(
      this.templatePath(`pages/${projectType}/index.js`),
      this.destinationPath(`src/pages/${projectType}/index.js`),
      this.answers
    );

    if (projectType === 'pc' || projectType === 'h5') {
      this.fs.copyTpl(
        this.templatePath(`pages/${projectType}/index.html`),
        this.destinationPath(`src/pages/${projectType}/index.html`),
        this.answers
      );
    }

    if (projectType === 'vue') {
      this.fs.copyTpl(
        this.templatePath(`pages/${projectType}/App.vue`),
        this.destinationPath(`src/pages/${projectType}/App.vue`),
        this.answers
      );
    } else {
      this.fs.copyTpl(
        this.templatePath(`pages/${projectType}/index.css`),
        this.destinationPath(`src/pages/${projectType}/index.${styleType}`),
        this.answers
      );
    }
  }
  install() {
    // Const hasYarn = commandExists('yarn');
    // this.installDependencies({
    //   npm: !hasYarn,
    //   yarn: hasYarn,
    //   skipMessage: this.options['skip-install-message'],
    //   skipInstall: this.options['skip-install']
    // });
  }
  end() {
    // Const packageJson = this.fs.readJSON(this.destinationPath('package.json'));
    // Const yarnLockJson = this.fs.readJSON(this.destinationPath('yarn.lock'));
    // const howToInstall = `After running ${chalk.yellow.bold('npm install')}, if fail try use cnpm install`;

    // if (this.options['skip-install']) {
    //   this.log(howToInstall);
    //   return;
    // }
    // if (yarnLockJson) {
    //   this.log(`${chalk.cyan.bold('In general, you have installed success!')}`);
    // }
    // this.log(this.config.getAll());
    this.log(`${chalk.green.bold('Your Project Create Success!')}`);
  }
};
