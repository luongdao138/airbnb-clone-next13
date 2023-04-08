// @ts-nocheck

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

interface RentState {
  isOpenRentModal: boolean;
}

type RentActions = {
  openRentModal: () => void;
  closeRentModal: () => void;
};

type RentStoreType = RentActions & RentState;

export const useRentStore = create<RentStoreType>(
  devtools<RentActions>(
    immer<RentStoreType>((set) => ({
      isOpenRentModal: false,
      openRentModal() {
        set(() => ({ isOpenRentModal: true }));
      },
      closeRentModal() {
        set(() => ({ isOpenRentModal: false }));
      },
    }))
  )
);
