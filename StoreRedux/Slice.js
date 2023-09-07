import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  user: [],

  count: 0,
  quntity: 1,
  amount: 1,
  language: 'En'
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // o zyad krdny item bo listy order w pishan yanawa la cart oage
    addInCart: (state, action) => {
      const val = state.value.find((food) => food.id === action.payload.id);
      if (!val) {
        state.value.push(action.payload);
      }
    },
    // bo nardy listy order halbzherdawa bo backend ...
    send: (state, action) => {
      const val = state.value.find(
        (food) => food.item_id === action.payload.item_id
      );
      if (!val) {
        state.user.push(action.payload);
      }
    },
    //  srynaway order law lista ka anerder bo back end

    deletesend: (state, action) => {
      state.user.splice(action.payload, 1);
    },
    // srynawa oredr  la cart list
    deleteorder: (state, action) => {
      state.value.splice(action.payload, 1);
    },

    // bo checky agar user login bwa yaxwd na agar
    check: (state, action) => {
      state.count = action.payload;
    },

    // aacount: (state, action) => {
    //   state.user.length = 0;
    //   state.user.push(action.payload);
    // },
    // empty: (state, action) => {
    //   state.value = [];
    //   state.user = [];
    // },


    //  am dw functionay xwarawa bo zyad krdn w kam krdny  zhmaray item bakar detet la naw cart listakaya
    inc: (state, action) => {
      const indrement = state.value.find((food) => food.id === action.payload);
      if (indrement) {
        indrement.quntity += 1;
      }
      state.quntity = indrement.quantity;
      const sendin = state.user.find((food) => food.item_id === action.payload);
      if (sendin) {
        sendin.amount += 1;
      }
    },

    /////////////////////////
    dec: (state, action) => {
      const decrement = state.value.find((food) => food.id === action.payload);
      if (decrement) {
        if (decrement.quntity > 1) {
          decrement.quntity -= 1;
        }
        state.quntity = decrement.quantity;
      }
    },

    ///////////////////////
    changelang: (state, action) => {
      // console.log(action.payload);
      localStorage.setItem('naturalselectionlanguage', action.payload);
      state.language = action.payload
    },
  },
});

export const {
  deleteorder,
  addInCart,
  send,
  inc,
  dec,
  deletesend,
  changelang,
  check,
} = slice.actions;
export default slice.reducer;
