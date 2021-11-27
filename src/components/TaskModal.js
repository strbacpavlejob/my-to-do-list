import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";

function TaskModal(props) {
  const [nameFormError, setNameFormError] = useState("");
  const [descriptionFormError, setDescriptionFormError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [priority, setPriority] = useState("low");

  useEffect(() => {
    setName(props.editTask.name);
    setDescription(props.editTask.description);
    setDate(props.editTask.date);
    setPriority(props.editTask.priority);
  }, [props.editMode]);

  const makeHashId = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setDate(new Date());
    setPriority("low");
    setNameFormError("");
    setDescriptionFormError("");
  };

  const checkForm = () => {
    let isFormValid = true;
    if (!name || name.length < 3) {
      setNameFormError("Name must be at least 3 characters long!");
      isFormValid = false;
    }
    if (!description || description.length < 3) {
      setDescriptionFormError(
        "Description must be at least 3 characters long!"
      );
      isFormValid = false;
    }
    return !isFormValid;
  };

  const handleSave = () => {
    if (checkForm()) {
      return;
    }
    let newTask = {
      id: makeHashId(),
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
    if (checkForm()) {
      return;
    }
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

  useEffect(() => {
    if (name && name.length > 3) {
      setNameFormError("");
    }
    if (description && description.length > 3) {
      setDescriptionFormError("");
    }
  }, [name, description]);

  return (
    <div>
      <Dialog open={props.open}>
        <DialogTitle>
          {props.editMode === true ? `Edit Task` : `Add new Task`}
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack component="form" noValidate spacing={3} width="500">
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
                error={nameFormError.length > 0}
                helperText={nameFormError}
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
                error={descriptionFormError.length > 0}
                helperText={descriptionFormError}
              />
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>
              <Select
                margin="normal"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priority}
                defaultValue={"low"}
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
