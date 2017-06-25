import { SET_SIDEBAR_STATUS, SET_SNACKBAR_STATUS, SET_MODAL_STATUS,SET_PREFERENCE_STATUS } from '../constants';

export default function ui(state, action) {
  if (action.type === SET_SIDEBAR_STATUS) {
    const show = typeof action.show === 'undefined' ? !state.getIn(['sidebar', 'show']) : action.show;
    return state.setIn(['sidebar', 'show'], show);
  }
  if (action.type === SET_SNACKBAR_STATUS) {
    const show = typeof action.show === 'undefined' ?
      !state.getIn(['snackbar', 'show']) : action.show;
    return state.update('snackbar', map => map.merge({
      show,
      message: action.message,
      timeout: action.timeout,
    }));
  }
  if ( action.type === SET_PREFERENCE_STATUS ) {
    const show = typeof action.show === 'undefined' ? ! state.getIn(['preference', 'show']) : action.show;
    let update = { show: show, message: action.message };
    if ( action.savePath ) {
      update.savePath = action.savePath;
    }
    return state.update('preference', map => map.merge(update));
  }
  if ( action.type === SET_MODAL_STATUS ) {
    return state.update('modal', map => map.merge({
      show: action.show,
      message: action.message,
    }));
  }
  return state;
}
