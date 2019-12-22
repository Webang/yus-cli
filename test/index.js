const inquirer = require('inquirer')

const promptList = [{
  type: 'list',
  message: '请选择一种水果:',
  name: 'fruit',
  choices: [
    "Apple",
    "Pear",
    "Banana"
  ],
  filter: function (val) {
  return val.toLowerCase();
  }
}];

inquirer.prompt(promptList).then(answers => {
  console.log(answers); // 返回的结果
})