import {
  AppBar,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import Add from "@material-ui/icons/Add";
import TaskModal from "./components/TaskModal";
import TaskList from "./components/TaskList";
import Cookies from "universal-cookie";

function App() {
  const cookies = new Cookies();

  const [taskList, setTaskList] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTask, setEditTask] = useState({});

  useEffect(() => {
    let list = cookies.get("myTaskList");
    if (list !== undefined) {
      setTaskList(cookies.get("myTaskList"));
    }
  }, []);

  useEffect(() => {
    const cookies = new Cookies();
    cookies.set("myTaskList", taskList, { path: "/" });
  }, [taskList]);

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
    editedTask.id = editTask.id;
    setTaskList([
      ...taskList.slice(0, index),
      editedTask,
      ...taskList.slice(index + 1),
    ]);
    handleModalClose();
  };
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(taskList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTaskList(items);
  };

  return (
    <div className="App">
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Todo List
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              handleTaskAdd();
            }}
          >
            <Add />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Divider />
      <header>
        <div className="tasks-list">
          {taskList.length > 0 ? (
            <TaskList
              tasks={taskList}
              edit={handleEditTask}
              delete={handleTaskDelete}
              toggleDone={handleTaskDoneToggle}
              dragTask={handleOnDragEnd}
            />
          ) : (
            <Typography
              variant="h7"
              component="div"
              sx={{ flexGrow: 1 }}
              textAlign="center"
              color="#666"
            >
              Add new tasks by clicking on plus sign
            </Typography>
          )}
        </div>
        <div>
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
