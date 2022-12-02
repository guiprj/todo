import { CreateTask } from './components/CreateTask';
import { Header } from './components/Header';
import { Task } from './components/Tasks';

import styles  from './App.module.css';

import './global.css';

export function App() {

  return (
    <div>
      <Header />
      <main className={styles.containerTasks}>
        <CreateTask />
      </main>
    </div>
    
  )
}
