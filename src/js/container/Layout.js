import React from 'react';

import Appbar from '../component/Appbar';
import Sidebar from '../component/Sidebar';
import Snackbar from '../component/Snackbar';
import Modal from '../component/Modal';
import Preference from '../component/Preference';

export default class extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
  };
  static defaultProps = {
    children: <div />,
  };

  render() {
    return (
      <div className="wrapper">
        <Appbar />
        <Sidebar />
        <Snackbar />
        <Modal />
        <Preference />
        {this.props.children}
      </div>
    );
  }
}
