import { useMemo } from "react";
import type { Activity } from "../types/types";
import CalorieDisplay from "./CalorieDisplay";

type CaloriesProp = {
  activities: Activity[];
};
const CalorieTracker = ({ activities }: CaloriesProp) => {
  //contadores
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );
  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const totalCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [activities]
  );
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de Calorias
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay calories={caloriesConsumed} text="Consumidas" />
        <CalorieDisplay calories={caloriesConsumed} text="Quemadas" />
        <CalorieDisplay calories={totalCalories} text="Diferencia" />
      </div>
    </>
  );
};

export default CalorieTracker;
