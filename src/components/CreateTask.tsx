import { Plus } from "phosphor-react";
import { FormEvent, useState, ChangeEvent } from "react";
import nextId from "react-id-generator";
import styles from "./CreateTask.module.css";
import { Task } from "./Tasks";

interface TaskProps {
  idUnique: string;
  contentInfo: string;
  isComplete: boolean;
  onChangeIsCompleteTask: (idUnique: string) => void;
  onDeleteTask: (idUnique: string) => void;
}

interface NewTaskProps {
  idUnique: string;
  contentInfo: string;
  isComplete: boolean;
}

export function CreateTask() {
  const [ newTasks, setNewTasks ]: any[] = useState([])

  const [newTaskText, setNewTaskText] = useState('');

  const [taskIsComplete, setTaskIsComplete] = useState([])

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault(); 
    if(newTaskText.length > 5) {
      const createNewTask: NewTaskProps = {
        idUnique: nextId(),
        contentInfo: newTaskText,
        isComplete: false
      }

      setNewTasks([...newTasks, createNewTask])
      setNewTaskText('')
    }
  }

  function handleDeleteTask (idTask: string) {
    const tasksWithoutDeleteOne = newTasks.filter((task: TaskProps) => task.idUnique !== idTask)
    setNewTasks(tasksWithoutDeleteOne)

    const tasksCompleted = tasksWithoutDeleteOne.filter((task: TaskProps) => {
      if(task.isComplete) {
        return task
      }
    })
    setTaskIsComplete(tasksCompleted)
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskText(event.target.value);
  }

  function handleChangeIsComplete (idTask: string) {
    const tasksChangeIsComplete = newTasks.filter((task: TaskProps) => {
      if(task.idUnique === idTask) {
        task.isComplete = task.isComplete ? false : true
      } 
      return task
    })
    
    setNewTasks(tasksChangeIsComplete)
    setTaskIsComplete(tasksChangeIsComplete)

    const tasksCompleted = newTasks.filter((task: TaskProps) => {
      if(task.isComplete) {
        return task
      }
    })
    setTaskIsComplete(tasksCompleted)
  }

  return (
    <>
      <form
        onSubmit={handleCreateNewTask}
        className={styles.containerCreateTask}
      >
        <input 
          type="text" 
          placeholder="Adicione uma nova tarefa" 
          onChange={handleNewTaskChange}
          value={newTaskText}
        />
        <button>
          Criar
          <Plus size={20} />
        </button>
      </form>

      <div className={styles.containerInfoTasks}>
        <div>
          <strong className={styles.tasksCreated}>Tarefas criadas</strong>
          <span>{newTasks.length}</span>
        </div>
        <div>
          <strong className={styles.tasksConcluded}>Concluídas</strong>
          <span>{taskIsComplete.length} de {newTasks.length}</span>
        </div>
      </div>

      {newTasks.map((task: TaskProps) => {
          return (
            <Task 
              key={task.idUnique}
              idUnique={task.idUnique}
              contentInfo={task.contentInfo}
              isComplete={task.isComplete}
              onChangeIsCompleteTask={handleChangeIsComplete}
              onDeleteTask={handleDeleteTask}
            />
          )
        })}
    </>
  );
}
