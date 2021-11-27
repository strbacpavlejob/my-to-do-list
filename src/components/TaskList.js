import Paper from "@mui/material/Paper";
import { Button, IconButton, Stack } from "@mui/material";
import { Delete } from "@material-ui/icons";
import Checkbox from "@mui/material/Checkbox";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const TaskList = (props) => {
  const handleDeleteRow = (row) => {
    props.delete(row);
  };
  const handleToggleDone = (row) => {
    props.toggleDone(row);
  };
  const handleEditRow = (row) => {
    props.edit(row);
  };
  const handleOnDragEnd = (result) => {
    props.dragTask(result);
    console.log(props.tasks);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tasksList">
        {(provided) => (
          <Stack
            direction="column"
            spacing={5}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {props.tasks.map((row, index) => (
              <Draggable key={index} draggableId={row.id} index={index}>
                {(provided) => (
                  <Item
                    key={index}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {" "}
                    <Checkbox
                      checked={row.done === true}
                      onChange={() => {
                        handleToggleDone(row);
                      }}
                    />
                    <Button
                      onClick={() => {
                        handleEditRow(row);
                      }}
                    >
                      {row.done === true ? (
                        <strike>{row.name}</strike>
                      ) : (
                        row.name
                      )}
                    </Button>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        handleDeleteRow(row);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Item>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
