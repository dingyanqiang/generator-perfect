import React from 'react';
import ReactDOM from 'react-dom';
import './index.<%= styleType %>';
/**
 * CSS Moudle
 * import style from './index.<%= styleType %>';
 */





class Welcome extends React.Component {
  state = {
    name: 'Perfect'
  }
  render() {
    return <h1>Hello, {this.state.name}</h1>;
  }
}

const render = Component => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root'),
  )
};

render(Welcome);

// Webpack Hot Module Replacement API
if (module.hot) {
	module.hot.accept()
  //module.hot.accept('./App', () => { render(App) })
}