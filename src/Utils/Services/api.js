import { init, pushData, setListener } from './initialize'
export const initApi = () => init();
export const getMessages = (updaterFn) => setListener('messages', updaterFn);
export const postMessage = (message) => {
  if (Boolean(message)) {
    pushData('messages', {
      incoming: false,
      message
    })
  }
}
