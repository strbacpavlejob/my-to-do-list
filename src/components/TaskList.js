import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton, Stack } from "@mui/material";
import { Delete } from "@material-ui/icons";
import Checkbox from "@mui/material/Checkbox";
import * as React from "react";
import { styled } from "@mui/material/styles";

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
  return (
    <Stack direction="column" spacing={2}>
      {props.tasks.map((row) => (
        <Item>
          {" "}
          <Checkbox
            checked={row.done}
            onChange={() => {
              handleToggleDone(row);
            }}
          />
          <Button
            onClick={() => {
              handleEditRow(row);
            }}
          >
            {row.done === true ? <strike>{row.name}</strike> : row.name}
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
      ))}
    </Stack>
  );
};

export default TaskList;
