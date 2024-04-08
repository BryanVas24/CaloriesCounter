import Form from "./components/Form";
import Header from "./components/Header";
import { useReducer, useEffect } from "react";
import { ActivityReducer, initialState } from "./reducers/activity-reducer";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  //dispatch es una funcion especial que te permite ejecutar las acciones
  const [state, dispatch] = useReducer(ActivityReducer, initialState);
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);
  return (
    <>
      <Header state={state} dispatch={dispatch} />

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>
      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker activities={state.activities} />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
