export interface conversationInterface {
  conversationId: string;
  members: string[];
  admin?: string;
  currentTopic?: string;
  convType: string;
  groupName?: string;
}

type Action =
  | { type: "ADD_CONV"; payload: conversationInterface }
  | { type: "ADD_CONVS"; payload: conversationInterface[] }
  | { type: "DEL_MSG"; payload: conversationInterface };

export const chatReducer = (state: conversationInterface[], action: Action) => {
  switch (action.type) {
    case "ADD_CONV":
      return [...state, action.payload];
    case 'ADD_CONVS':
        return [...state,...action.payload]
    default:
        return state;
  }
};
