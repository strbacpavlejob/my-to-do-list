import { AppBar, Button, Divider, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import "./App.css";
import Add from "@material-ui/icons/Add";
import TaskModal from "./components/TaskModal";
import TaskList from "./components/TaskList";
import { Box } from "@mui/system";

function App() {
  const [taskList, setTaskList] = useState([
    {
      name: "dasfsdf",
      description: "sdfsdfdsf",
      date: "2021-11-03",
      priority: "low",
      done: false,
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTask, setEditTask] = useState({});

  const handleTaskAdd = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
    setEditMode(false);
    setEditTask({});
  };
  const handleModelSave = (data) => {
    setTaskList([...taskList, data]);
    setOpenModal(false);
    console.log(taskList);
  };
  const handleTaskDelete = (currentTask) => {
    setTaskList(
      taskList.filter((task) => {
        return task !== currentTask;
      })
    );
  };
  const handleTaskDoneToggle = (currentTask) => {
    let index = taskList.indexOf(currentTask);
    let taskNew = Object.assign({}, currentTask);
    taskNew.done = !taskNew.done;

    setTaskList([
      ...taskList.slice(0, index),
      taskNew,
      ...taskList.slice(index + 1),
    ]);
  };
  const handleEditTask = (currentTask) => {
    setEditMode(true);
    setEditTask(currentTask);
    setOpenModal(true);
  };
  const edit = (editedTask) => {
    let index = taskList.indexOf(editTask);
    editedTask.done = editTask.done;

    setTaskList([
      ...taskList.slice(0, index),
      editedTask,
      ...taskList.slice(index + 1),
    ]);
    handleModalClose();
  };

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Todo List
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Divider />
      <header className="App-header">
        <div className="add-task-form">
          <Button
            variant="contained"
            onClick={() => {
              handleTaskAdd();
            }}
          >
            Add new Task
            <Add />
          </Button>
        </div>
        <div className="tasks-list">
          {taskList.length > 0 ? (
            <TaskList
              tasks={taskList}
              edit={handleEditTask}
              delete={handleTaskDelete}
              toggleDone={handleTaskDoneToggle}
            />
          ) : null}
        </div>
        <div className="modal">
          <TaskModal
            open={openModal}
            close={handleModalClose}
            save={handleModelSave}
            edit={edit}
            editMode={editMode}
            editTask={editTask}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
