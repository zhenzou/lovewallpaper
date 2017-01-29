import Immutable from 'immutable';

export const SET_SIDEBAR_STATUS = 'SET_SIDEBAR_STATUS';
export const LOAD_METADATA = 'LOAD_METADATA';
export const LOAD_LIST = 'LOAD_LIST';


export const INITIAL_STATE = Immutable.Map({
  metadata: Immutable.Map({}),
  sidebar: Immutable.Map({ show: false }),
});
