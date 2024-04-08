import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
//el uuid genera un id unico (de tipo string)
import { v4 as uuidv4 } from "uuid";
import type { Activity } from "../types/types";
import { AcivityState, ActivityActions } from "../reducers/activity-reducer";
import { categories } from "../data/categories";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: AcivityState;
};
const Form = ({ dispatch, state }: FormProps) => {
  const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0,
  };
  //state de actividad
  const [activity, setActivity] = useState<Activity>(initialState);
  useEffect(() => {
    if (state.activeId) {
      const selectActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];
      setActivity(selectActivity);
    }
  }, [state.activeId]);
  //Aca se setean los datos en el state
  const HandleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };
  //verificación
  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };
  //cuando se le de click al boton
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    //mandas a llamar otra vez la funcion uuidv4 para que cree un nuevo id para el siguiente elemento
    setActivity({ ...initialState, id: uuidv4() });
  };
  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg">
      <div className="grid grid-cols-1 gap-3">
        <label className="font-bold text-2xl" htmlFor="category">
          Categoria:
        </label>
        <select
          value={activity.category}
          className="border rounded p-2"
          name="categories"
          id="category"
          onChange={HandleChange}
        >
          {categories.map((categoryItem) => (
            <option key={categoryItem.id} value={categoryItem.id}>
              {categoryItem.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label className="font-bold text-2xl" htmlFor="name">
          Actividad:
        </label>
        <input
          placeholder={
            activity.category === 1
              ? "¿Qué comiste?"
              : "¿Que ejercicio realizaste?"
          }
          type="text"
          id="name"
          className="border p-2 rounded"
          value={activity.name}
          onChange={HandleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label className="font-bold text-2xl" htmlFor="calories">
          Calorias:
        </label>
        <input
          placeholder="calorias"
          type="number"
          min={0}
          id="calories"
          className="border p-2 rounded"
          value={activity.calories}
          onChange={HandleChange}
        />
      </div>
      <input
        type="button"
        className="disabled:opacity-10 w-full cursor-pointer bg-gray-800 hover:via-gray-900 p-2 font-bold uppercase text-white"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar ejercicio"}
        disabled={!isValidActivity()}
        onClick={(e) => handleSubmit(e)}
      />
    </form>
  );
};

export default Form;
