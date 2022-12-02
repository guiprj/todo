import { Trash } from "phosphor-react";
import styles from "./Tasks.module.css";

interface TaskProps {
  idUnique: string;
  contentInfo: string;
  isComplete: boolean;
  onChangeIsCompleteTask: (idUnique: string) => void;
  onDeleteTask: (idUnique: string) => void;
}

export function Task({ idUnique, contentInfo, isComplete, onChangeIsCompleteTask, onDeleteTask }: TaskProps) {

  function handleClickTask() {
    onChangeIsCompleteTask(idUnique)
  }

  function handleClicDeletekTask () {
    onDeleteTask(idUnique)
  }

  return (
    <div className={styles.tasks}>
      <input id={idUnique} type="checkbox" defaultChecked={isComplete} />

      <label onClick={handleClickTask} htmlFor={idUnique}>
        <p>{contentInfo}</p>
      </label>

      <button onClick={handleClicDeletekTask} title="Deletar task">
        <Trash size={25} />
      </button>
    </div>
  );
}
