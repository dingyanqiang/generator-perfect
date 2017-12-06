const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  initializing() {
    this.log(`${chalk.green.bold('Create Component Start!')}`);
    this.pkg = require('../../package.json');
  }
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: 'Name of Component?',
        default: 'index'
      }
    ];
    return this.prompt(prompts).then(answers => {
      this.answers = answers;
    });
  }
  _getComponentName(str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
  }

  writing() {
    const defaultsConfig = this.config.getAll();
    const { projectType, styleType } = defaultsConfig;
    const componentName = this._getComponentName(this.answers.componentName);
    // DefaultsConfig.componentName = componentName;

    let ext = projectType == 'vue' ? 'vue' : 'js';
    let tplPath = `${projectType}.${ext}`;
    let desPath = `src/components/${componentName}/index.${ext}`;
    this.fs.copyTpl(this.templatePath(tplPath), this.destinationPath(desPath), {
      componentName: componentName
    });
    this.fs.copy(
      this.templatePath(`index.css`),
      this.destinationPath(`src/components/${componentName}/index.${styleType}`)
    );
  }

  end() {
    // This.log(this.config.getAll());
    this.log(`${chalk.green.bold('Create Component Finish!')}`);
  }
};
