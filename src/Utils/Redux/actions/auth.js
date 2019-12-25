export const auth = (user = null) => {
  if (user !== null) {
    return {
      type: 'AUTH',
      payload: user
    }
  } else {
    return {
      type: 'AUTH',
      payload: null
    }
  }
}
