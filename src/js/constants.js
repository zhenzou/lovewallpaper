import { fromJS } from 'immutable';
import { setting } from '../../setting';

export const SET_SIDEBAR_STATUS = 'SET_SIDEBAR_STATUS';
export const SET_SNACKBAR_STATUS = 'SET_SNACKBAR_STATUS';
export const SET_MODAL_STATUS = 'SET_MODAL_STATUS';
export const SET_PREFERENCE_STATUS = 'SET_PREFERENCE_STATUS';
export const LOAD_METADATA = 'LOAD_METADATA';
export const LOAD_LIST = 'LOAD_LIST';
export const LOAD_MORE = 'LOAD_MORE';

export const INITIAL_STATE = fromJS({
  metadata: {},
  ui: {
    sidebar: {
      show: false,
    },
    snackbar: {
      show: false,
      message: '',
      timeout: 4000,
    },
    modal: {
      show: false,
      message: '',
    },
    preference: {
      show: false,
      savePath: setting().savePath,
      message: '',
    },
  },
});
