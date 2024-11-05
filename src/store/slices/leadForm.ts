// leadFormSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LeadFormState {
  name: string;
  email: string;
  unitType: string;
  budget: string;
  book_appointment: boolean;
  date: Date | null;
  mobile_no: string;
  is_retailer: any;
  purchase_type: any;
  property: any;
  description: any;
}

const initialState: LeadFormState = {
  name: "",
  email: "",
  unitType: "",
  budget: "",
  book_appointment: true,
  date: null,
  mobile_no: "",
  is_retailer: true,
  purchase_type: "condo",
  property: 31,
  description: "",
};

const leadForm = createSlice({
  name: "leadForm",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof LeadFormState; value: any }>
    ) => {
      const { field, value } = action.payload;
      if (field === "book_appointment") {
        state[field] = value === "yes";
      } else {
        state[field] = value;
      }
    },

    resetForm: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { updateField, resetForm } = leadForm.actions;
export default leadForm.reducer;
