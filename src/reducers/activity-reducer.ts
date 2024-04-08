import type { Activity } from "../types/types";
export type ActivityActions =
  | {
      type: "save-activity";
      payload: { newActivity: Activity };
    }
  | {
      type: "set-activeId";
      payload: { id: Activity["id"] };
    }
  | {
      type: "delete-Activity";
      payload: { id: Activity["id"] };
    }
  | {
      type: "restart-app";
    };
export type AcivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};
const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};
export const initialState: AcivityState = {
  activities: localStorageActivities(),
  activeId: "",
};
export const ActivityReducer = (
  state: AcivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    //Este codigo maneja la logica para actualizar el state
    let updatedActivities: Activity[] = [];
    if (state.activeId) {
      updatedActivities = state.activities.map((act) =>
        act.id === state.activeId ? action.payload.newActivity : act
      );
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity];
    }
    return {
      ...state,
      activities: updatedActivities,
      activeId: "",
    };
  }
  if (action.type === "set-activeId") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }
  if (action.type === "delete-Activity") {
    return {
      ...state,
      activities: state.activities.filter(
        (activity) => activity.id !== action.payload.id
      ),
    };
  }
  if (action.type === "restart-app") {
    return {
      activities: [],
      acttiveId: "",
    };
  }

  return state;
};
