import { resolvePreset } from "@babel/core";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export type EditTaskArgs = {
  tasdkId: number;
  taskNewTitle: string;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskSameTitle = tasks.find((task) => task.title === newTaskTitle);

    if (taskSameTitle) {
      return Alert.alert("Tarefa já cadastrada", "Você não pode cadastrar com o mesmo nome");
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    setTasks((oldTasks) => [...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));
    const taskToBeMarketAsDone = updatedTasks.find((item) => item.id === id);

    if (!taskToBeMarketAsDone) return;

    taskToBeMarketAsDone.done = !taskToBeMarketAsDone.done;

    setTasks(updatedTasks); //assincrono
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          style: "cancel",
          text: "Não",
        },
        {
          style: "destructive",
          text: "Sim",
          onPress: () => {
            const updatedTasks = tasks.filter((task) => task.id !== id);
            setTasks(updatedTasks);
          },
        },
      ]
    );
  }
  function handleEditTask({ tasdkId, taskNewTitle }: EditTaskArgs) {
    const updatedTasks = tasks.map((task) => ({ ...task }));
    const taskToBeUpdate = updatedTasks.find((item) => item.id === tasdkId);
    if (!taskToBeUpdate) return;

    taskToBeUpdate.title = taskNewTitle;
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
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
