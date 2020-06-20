import Types from '../../action/types';

const defaultState = {};

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.FAVORITE_LOAD_DATA: // load data
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                }
            };
        case Types.FAVORITE_LOAD_SUCCESS: // drop down success
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,//show data
                    isLoading: false,
                }
            };
        case Types.FAVORITE_LOAD_FAIL://drop down fail
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                }
            };
        default:
            return state;
    }

}