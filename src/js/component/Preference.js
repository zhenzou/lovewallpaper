import React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import { ipcRenderer } from 'electron';
import { setPreferenceStatus } from '../action/ui';
import { setting } from '../../../setting';

const { dialog } = require('electron').remote;

const mapStateToProps = state => state.getIn(['ui', 'preference']).toObject();

const mapDispatchToProps = dispatch => bindActionCreators(
  { setPreferenceStatus }, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class Preference extends React.Component {
  static propTypes = {
    setPreferenceStatus: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool.isRequired,
    message: React.PropTypes.string.isRequired,
    savePath: React.PropTypes.string.isRequired,
  };

  @autobind
  onCancel() {
    this.props.setPreferenceStatus(false);
  }

  @autobind
  onOk() {
    if ( this.props.savePath ) {
      this.props.setPreferenceStatus(false, this.props.savePath);
      setting().savePath = this.props.savePath;
      ipcRenderer.send('save-setting', setting());
    } else {
      this.props.setPreferenceStatus(false);
    }
  }

  @autobind
  onSelect() {
    let paths = dialog.showOpenDialog({ properties: ['openDirectory'] });
    if ( paths ) {
      this.props.setPreferenceStatus(true, paths[0]);
    } else {
      this.props.setPreferenceStatus(true);
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="确定"
        primary
        onTouchTap={this.onOk}
      />,
      <FlatButton
        label="取消"
        primary
        onTouchTap={this.onCancel}
      />
    ];
    return (
      <Dialog
        title="Preference"
        actions={actions}
        modal
        open={this.props.show}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Table>
            <TableBody
              displayRowCheckbox={false}
              selectable={false}>
              <TableRow selectable={false}>
                <TableRowColumn style={{ width: 80 }}>保存路径</TableRowColumn>
                <TableRowColumn style={{ width: 200 }}>
                  <TextField
                    id="preference-save-path"
                    value={this.props.savePath}
                    fullWidth={true}
                  />
                </TableRowColumn>
                <TableRowColumn style={{ width: 60 }}>
                  <FlatButton
                    label="选择路径"
                    default
                    onTouchTap={this.onSelect}
                  />
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
          <span
            style={{ flex: 1, marginLeft: '20px' }}>{this.props.message}</span>
        </div>
      </Dialog>
    );
  }
}

