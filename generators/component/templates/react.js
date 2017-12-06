import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
//import styles from './index.less';


class <%= componentName %> extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: 'Welcome to use React'
		};
	}
	render() {
		return (
			<div>{this.state.text}</div>
		);
	}
}

<%= componentName %>.displayName = '<%= componentName %>';
/**
 * <%= componentName %>.defaultProps = { name: 'ding' }
 * <%= componentName %>.proptypes = { name: PropTypes.string }
 */

export default <%= componentName %>;