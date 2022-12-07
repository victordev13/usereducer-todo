import produce from 'immer'
import { ActionTypes } from './ActionTypes'

type IAction = {
  type: ActionTypes
  payload: any
}

export type IState = {
  items: {
    id: string;
    name: string;
  }[]
}

export function todoReducer(state: IState, action: IAction) {
  switch (action.type) {
    case ActionTypes.ADD_ITEM:
      return produce(state, draft => {
        draft.items.push({
          id: new Date().getTime().toString(),
          name: action.payload
        })
      })

    case ActionTypes.REMOVE_ITEM:
      return produce(state, draft => {
        const index = draft.items.findIndex(item => item.id !== action.payload)
        draft.items.splice(index, 1)
      })

    default:
      throw new Error('invalid action!');
  }
}
