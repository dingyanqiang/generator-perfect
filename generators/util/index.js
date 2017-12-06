const Generator = require('yeoman-generator');
// Const commandExists = require('command-exists').sync;
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    this.log(`${chalk.green.bold('Create Util Start!')}`);
  }
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'utilName',
        message: 'Name of Util?',
        default: 'index'
      }
    ];
    return this.prompt(prompts).then(answers => {
      this.answers = answers;
    });
  }
  _getUtilName(str) {
    return str.substring(0,1).toUpperCase() + str.substring(1).toLowerCase();
  }
  writing() {
    const utilName = this._getUtilName(this.answers.utilName);
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(`src/utils/${this.answers.utilName}.js`),
      {
        utilName: utilName
      }
    );
  }
  end() {
    //this.log(this.config.getAll());
    this.log(`${chalk.green.bold('Create Util End!')}`);
  }
};
