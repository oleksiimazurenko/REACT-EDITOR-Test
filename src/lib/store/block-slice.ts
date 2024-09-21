import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlocksType } from '../model/types'

type BlockState = {
  currentBlocks: BlocksType[];
  activeBlockId: string | null;
}

const initialState: BlockState = {
  currentBlocks: [],
  activeBlockId: null,
};

const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    setActiveBlockId: (state, action: PayloadAction<string | null>) => {
      state.activeBlockId = action.payload;
    },
    setBlocks: (state, action: PayloadAction<BlocksType[]>) => {
      state.currentBlocks = action.payload;
    },
    updateBlocks: (
      state,
      action: PayloadAction<{
        updater: (blocks: BlocksType[]) => BlocksType[];
        isChangedInput: boolean;
      }>
    ) => {
      const { updater } = action.payload;
      state.currentBlocks = updater(state.currentBlocks);
    },
  },
});

export const { setActiveBlockId, setBlocks, updateBlocks } = blockSlice.actions;
export const blockReducer = blockSlice.reducer;