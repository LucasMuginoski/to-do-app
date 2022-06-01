import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taksNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
 

  function handleAddTask(newTaskTitle: string) {
    //buscar mesmo titulo
    const repeatedTitle = tasks.find(task => task.title === newTaskTitle);
    if (repeatedTitle){
      return Alert.alert("Task já cadastrada!", 'Você não pode cadastrar uma task com o mesmo nome');
    }
    
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldTask => [...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const foundItem = updatedTasks.find(item => item.id === id);
    
    if (!foundItem)
      return;
    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
    
  }

  function handleRemoveTask(id: number) {
    //quando clica no botão exibe o alerta perguntado, se não cancela e se sim faz o remove
    Alert.alert('Remover item','Tem certeza que você deseja remover esse item?',[
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const updatedTasks = tasks.filter(tasks => tasks.id !== id);
          setTasks(updatedTasks);
        }
      },
      {
        style: 'cancel',
        text: 'Não'
      }
    ])
  }

  function handleEditedTaks({taskId, taksNewTitle} : EditTaskArgs){
    const updatedTasks = tasks.map(task => ({ ...task}));
    const taskToUpdate = updatedTasks.find(task => taskId === taskId);
    
    if (!taskToUpdate)
      return;

    taskToUpdate.title = taksNewTitle;
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditedTaks}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})