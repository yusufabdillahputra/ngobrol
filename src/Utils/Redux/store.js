import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

import reducers from './reducers/index';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(
  persistConfig,
  reducers,
);

export default () => {
  const logger = createLogger();
  const store = createStore(
    persistedReducer,
    applyMiddleware(promiseMiddleware, logger)
  );
  const persistor = persistStore(store);
  return {
    store,
    persistor,
  };
}
