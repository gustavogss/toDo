import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Task } from "../components/TasksList";
import trashIcon from "../assets/icons/trash/trash.png";
import Icon from "react-native-vector-icons/Feather";
import { EditTaskArgs } from "../pages/Home";
import editIcon from "../assets/icons/edit/edit.png";

interface TasksItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ tasdkId, taskNewTitle }: EditTaskArgs) => void;
}
export function TaskItem({
  task,
  editTask,
  removeTask,
  toggleTaskDone,
}: TasksItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }
  function handleCancelEditing() {
    setTaskNewTitleValue(task.title);
    setIsEditing(false);
  }
  function handleSubmitEditing() {
    editTask({ tasdkId: task.id, taskNewTitle: taskNewTitleValue });
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <View style={styles.tasks}>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View style={task.done ? styles.taskMarkerDone : styles.taskMarker}>
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={taskNewTitleValue}
            editable={isEditing}
            onChangeText={setTaskNewTitleValue}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider} />

        <TouchableOpacity
          disabled={isEditing}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,       
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  tasks: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoContainer: {
    flex: 1,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 24,
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196,196,196, 0.24)",
    marginHorizontal: 12,
  },
});
