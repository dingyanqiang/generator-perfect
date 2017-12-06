require('./index.css');


/* eslint-env browser */
var app = document.getElementById('root');
// var time = document.getElementById('time');
// var timer = setInterval(updateClock, 1000);
// function updateClock() {
//   time.innerHTML = (new Date()).toString();
// }


app.style.display = 'table-cell';
app.style.width = '600px';
app.style.height = '400px';
app.style.border = '30px solid #339';
app.style.background = '#99d';
app.style.color = '#fff';
app.style.textAlign = 'center';
app.style.verticalAlign = 'middle';


let num = 0;
if (module.hot) {
	console.log(++num);
  module.hot.accept();
  // module.hot.dispose(function() {
  //   clearInterval(timer);
  // });
}
