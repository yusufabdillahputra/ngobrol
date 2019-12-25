const initialState = {
  stateArray: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH':
      return {
        ...state,
        isFulfilled: true,
        stateArray: action.payload
      }
    case 'AUTH_PENDING':
      return {
        ...state,
        isPending: true
      }
    case 'AUTH_REJECTED':
      return {
        ...state,
        isRejected: true
      }
    default:
      return state
  }
}

export default auth
