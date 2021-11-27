import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function TaskModal(props) {
  const [open, setOpen] = useState(props.open);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setName(props.editTask.name);
    setDescription(props.editTask.description);
    setDate(props.editTask.date);
    setPriority(props.editTask.priority);
  }, [props.editMode]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setDate(new Date());
    setPriority("low");
  };

  const handleSave = () => {
    let newTask = {
      name: name,
      description: description,
      date: date,
      priority: priority,
      done: false,
    };
    props.save(newTask);
    resetForm();
  };

  const handleEdit = () => {
    let editedTask = {
      name: name,
      description: description,
      date: date,
      priority: priority,
      done: false,
    };
    props.edit(editedTask);
    resetForm();
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [priority, setPriority] = useState("low");

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>
          {props.editMode === true ? `Edit Task` : `Add new Task`}
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack component="form" noValidate spacing={3} minWidth={450}>
              <TextField
                autoFocus
                margin="normal"
                id="name"
                label="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                fullWidth
                variant="standard"
                inputProps={{ maxLength: 100 }}
              />
              <MobileDatePicker
                label="Date"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                minDate={new Date()}
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                multiline
                margin="normal"
                id="name"
                label="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                type="email"
                fullWidth
                variant="standard"
                inputProps={{ maxLength: 1000 }}
              />
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>
              <Select
                margin="normal"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priority}
                label="Priority"
                onChange={(event) => setPriority(event.target.value)}
              >
                <MenuItem value={"low"}>Low</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"high"}>High</MenuItem>
              </Select>
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.close();
            }}
          >
            Cancel
          </Button>
          {props.editMode === true ? (
            <Button
              onClick={() => {
                handleEdit();
              }}
            >
              Edit
            </Button>
          ) : (
            <Button
              onClick={() => {
                handleSave();
              }}
            >
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TaskModal;
