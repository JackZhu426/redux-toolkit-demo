import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialCounterState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counterSlice',
  initialState: initialCounterState,
  reducers: {
    // 写法1
    increment: (state) => {
      // because of 'immer' library, it makes it immutable and will return a new object
      state.value += 1;
    },

    // 写法2
    decrement(state) {
      state.value -= 1;
    },

    amountAdded(state, action: PayloadAction<number>) {
      console.log('action type:', action.type);
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, amountAdded } = counterSlice.actions;

/**
 * The slice's reducer.
 */
export default counterSlice.reducer;
