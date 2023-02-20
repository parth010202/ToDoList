import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./App.css";
import TodoCard from "./Component/TodoCard/TodoCard";

function App() {
  const [toDos, setToDos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    let data = localStorage.getItem("data");
    if (data) {
      setToDos(JSON.parse(data));
    }
  }, []);
  let value
  const addHandler = () => {
    let newTodo = {
      id: Math.random(),
      title: newTitle,
      time:Math.floor(Date.now() / 1000),
      color: "",
      description: newDescription,
      isCompleted: false,
      isDeleted: false,
    };
    if(newTodo.title===""){
      alert("Title cannot be empty! Please enter a title!!!")
      return false;
    }
    if(newTodo.description===""){
      alert("Description cannot be empty! Please enter a description!!!")
      return false;
    }
    toDos.push(newTodo);
    setToDos([...toDos]);

    localStorage.setItem("data", JSON.stringify(toDos));
  };

  const completeHandler = (id) => {
    const todo = toDos.find((e) => e.id === id);
    todo.isCompleted = true;
    setToDos([...toDos]);
    localStorage.setItem("data", JSON.stringify(toDos));
  };

  const deleteHandler = (id) => {
    const todo = toDos.find((e) => e.id === id);
    todo.isDeleted = true;
    setToDos([...toDos]);
    localStorage.setItem("data", JSON.stringify(toDos));
  };
  const UpdateColor = (id, color) => {
  
    const todo = toDos.find(e => e.id === id); 
    todo.color = color 
    setToDos([...toDos]) 
    localStorage.setItem("data", JSON.stringify(toDos)) 
  }

  console.log(toDos);
  return (
    <div className="main-container">
      <div className="input-container">
        <Box
          className="textfield"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off">
          <h3>Title</h3>
          <TextField
            id="outlined-basic"
            label="Enter Todo"
            variant="outlined"
            required
            onChange={(data) => setNewTitle(data.target.value)}
            error={value === ""}
            helperText={value === "" ? "Please enter a value!" : " "}
          />
          {/* <br /> */}
          <h4>Description</h4>
          <TextField
            id="outlined-basic"
            label="Enter description"
            variant="outlined"
            fullwidth
            size="normal"
            multiline
            required
            onChange={(data) => setNewDescription(data.target.value)}
            error={value === ""}
            helperText={value === "" ? "Please enter a value!" : " "}
          />
          <br/>
          <Button variant="contained" size="large"onClick={addHandler}>
          Add
          </Button>
        </Box>
          
      </div>
      <div className="output-container">
        <div className="card-container">
          <h4>Pending</h4>
          <div className="card-list">
            {toDos.reverse()?.map((e) => {
              if (!e.isCompleted) {
                return (
                  <div>
                    {!e.isDeleted && (
                      <TodoCard
                        key={e.id}
                        title={e.title}
                        id={e.id}
                        description={e.description}
                        complete={completeHandler}
                        updateColor={UpdateColor}
                        isCompleted={e.isCompleted}
                        color={e.color}
                        delete={deleteHandler}
                      />
                    )}
                  </div>
                );
              } else {
                return <></>;
              }
            })}
          </div>
        </div>
        <div className="card-container">
          <h4>Completed</h4>
          <div className="card-list">
            {toDos?.map((e) => {
              if (e.isCompleted) {
                return (
                  !e.isDeleted && (
                    <TodoCard
                      key={e.id}
                      id={e.id}
                      title={e.title}
                      description={e.description}
                      isCompleted={e.isCompleted}
                      delete={deleteHandler}
                      color={e.color}
                      updateColor={UpdateColor}
                    />
                  )
                );
              } else {
                return <></>;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

//.sort((a,b)=>a.time<b.time?1:-1)
 // time:Math.floor(Date.now() / 1000),