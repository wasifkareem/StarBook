// Define the shape of your global state
export interface AppState {
  spaces: {
    list: any[];
    isLoading: boolean;
    selectedSpace: any | null;
  };
}

// Define action types for state updates
export type AppAction =
  | { type: "SET_USER"; payload: { id: string; email: string } }
  | { type: "SET_USER_LOADING"; payload: boolean }
  | { type: "CLEAR_USER" }
  | { type: "SET_SPACES"; payload: any[] }
  | { type: "SET_SPACES_LOADING"; payload: boolean }
  | { type: "SET_SELECTED_SPACE"; payload: any }
  | { type: "SET_TESTIMONIALS"; payload: any[] }
  | { type: "SET_TESTIMONIALS_LOADING"; payload: boolean }
  | { type: "RELOAD_SPACES" }
  | { type: "RELOAD_TESTIMONIALS" };
