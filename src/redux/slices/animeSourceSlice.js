// store/slices/animeSourceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const animeSourceSlice = createSlice({
  name: 'animeSource',
  initialState: {
    source: 'samehadaku', // Defaultnya samehadaku
  },
  reducers: {
    setSource: (state, action) => {
      state.source = action.payload;
    },
    toggleSource: (state) => {
      state.source = state.source === 'samehadaku' ? 'otakudesu' : 'samehadaku';
    },
  },
});

export const { setSource, toggleSource } = animeSourceSlice.actions;
export default animeSourceSlice.reducer;
