import { useMemo, Dispatch } from "react";
import type {
  AcivityState,
  ActivityActions,
} from "../reducers/activity-reducer";
type HeaderProps = {
  state: AcivityState;
  dispatch: Dispatch<ActivityActions>;
};
const Header = ({ state, dispatch }: HeaderProps) => {
  const canRestart = () =>
    useMemo(() => state.activities.length > 0, [state.activities]);
  return (
    <header className="bg-lime-600 py-3">
      <div className="max-w-4xl mx-auto flex justify-between">
        <h1 className="text-center text-lg font-bold text-white uppercase">
          Contador de calorias
        </h1>
        <button
          disabled={!canRestart()}
          className="disabled:opacity-10 p-2 text-white text-lg font-bold uppercase bg-gray-800 hover:bg-gray-900"
          onClick={() => dispatch({ type: "restart-app" })}
        >
          Reiniciar app
        </button>
      </div>
    </header>
  );
};

export default Header;
