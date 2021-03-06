import produce, { setAutoFreeze } from 'immer';
import { MutableRefObject } from 'react';
import { Object3D, XRHandedness } from 'three';
import createStore, { State as ZustandState, StateCreator } from 'zustand';

import { HandModel } from './HandModel';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const immer =
  <T extends ZustandState>(config: StateCreator<T, (fn: (state: T) => void) => void>): StateCreator<T> =>
  (set, get, api) =>
    config((fn) => set(produce(fn) as (state: T) => T), get, api);

setAutoFreeze(false);

export type State = {
  hands: {
    models?: MutableRefObject<{ [key in XRHandedness]?: HandModel }>;
    interacting?: MutableRefObject<{ [key in XRHandedness]?: Object3D }>;
  };
  set: (fn: (state: State) => void | State) => void;
};

export const useStore = createStore<State>(
  immer((set, get, api) => {
    return {
      hands: {
        models: undefined,
        interacting: undefined,
      },
      set: (fn: (state: State) => void | State) => {
        set(fn);
      },
    };
  }),
);
