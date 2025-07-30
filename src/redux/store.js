import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/ThemeSlice.js';
import userReducer from './slices/userSlice.js';


const store = configureStore({
    reducer: {
        theme: themeReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ immutableCheck: { warnAfter: 128 }, serializableCheck: { warnAfter: 128 }}),
});

export default store;