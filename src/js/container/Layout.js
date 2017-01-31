import React from 'react';

import Appbar from '../component/Appbar';
import Sidebar from '../component/Sidebar';
import Snackbar from '../component/Snackbar';
import Modal from '../component/Modal';

export default class extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Appbar />
        <Sidebar />
        <Snackbar />
        <Modal />
        {this.props.children}
      </div>
    );
  }
}
