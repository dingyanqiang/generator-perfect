const Generator = require('yeoman-generator');
// Const commandExists = require('command-exists').sync;
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    this.log(`${chalk.green.bold('Create Page Start!')}`);
    this.pkg = require('../../package.json');
  }
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'pageName',
        message: 'Name of Page?',
        default: 'index'
      }
    ];
    return this.prompt(prompts).then(answers => {
      this.answers = answers;
    });
  }

  writing() {
    this._writingPageFile();
  }

  _writingPageFile() {
    //const { projectType, styleType } =  this.pkg;
    const defaultsConfig = this.config.getAll();
    const { projectType, styleType } =  defaultsConfig;
    const pageName = this.answers.pageName.toLowerCase();
    defaultsConfig.pageName = pageName;
  
    this.fs.copyTpl(
      this.templatePath(`${projectType}/index.js`),
      this.destinationPath(`src/pages/${pageName}/index.js`),
      defaultsConfig
    );

    if( projectType == 'pc' || projectType == 'h5'){
      this.fs.copyTpl(
        this.templatePath(`${projectType}/index.html`),
        this.destinationPath(`src/pages/${pageName}/index.html`),
        defaultsConfig
      );
    }

    if( projectType == 'vue' ){
      this.fs.copyTpl(
        this.templatePath(`${projectType}/App.vue`),
        this.destinationPath(`src/pages/${pageName}/App.vue`),
        defaultsConfig
      );
    } else {
      this.fs.copyTpl(
        this.templatePath(`${projectType}/index.css`),
        this.destinationPath(`src/pages/${pageName}/index.${styleType}`),
        defaultsConfig
      );
    }
  }

  end() {
    //this.log(this.config.getAll());
    this.log(`${chalk.green.bold('Create Page End!')}`);
  }
};
