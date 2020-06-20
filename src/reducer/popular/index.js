import Types from '../../action/types';

const defaultState = {};

export default function onAction(state = defaultState, action) {
    switch (action.type) {
      case Types.POPULAR_REFRESH://drop down 
      return {
          ...state,
          [action.storeName]: {
              ...state[action.storeName],
              isLoading: true,
              hideLoadingMore: true,
          },
      };
        case Types.POPULAR_REFRESH_SUCCESS://drop down success
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items,//original data
                    projectModels: action.projectModels,//show data
                    isLoading: false,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                },
            };

        case Types.POPULAR_REFRESH_FAIL://drop down fail
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                },
            };
        case Types.POPULAR_LOAD_MORE_SUCCESS://reflash data success
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                },
            };
        case Types.POPULAR_LOAD_MORE_FAIL://reflash data fail
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex,
                },
            };
        case Types.FLUSH_POPULAR_FAVORITE://flush favorite state
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                },
            };
        default:
            return state;
    }

}
