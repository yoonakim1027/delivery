// userReducer.js

// 초기 상태 정의
const initialState = {
  token: null,
  refreshToken: null,
};

// 액션 타입 정의
const SET_TOKEN = 'SET_TOKEN';
const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';

// 액션 생성자 함수
export const setToken = token => ({
  type: SET_TOKEN,
  payload: token,
});

export const setRefreshToken = refreshToken => ({
  type: SET_REFRESH_TOKEN,
  payload: refreshToken,
});

// 리듀서 함수
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
