import { useState } from "react";
import styles from "./AddTodo.module.css";
import { IoMdAdd } from "react-icons/io";

function AddTodo({ handleAddButtonClick }) {
  const [todoTask, setTodoTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleTodoTaskOnChange = (event) => {
    let newTodoTask = event.target.value;
    setTodoTask(newTodoTask);
  };

  const handleDueDateChange = (event) => {
    let newDate = event.target.value;
    setDueDate(newDate);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    handleAddButtonClick(todoTask, dueDate);
    setTodoTask("");
    setDueDate("");
  };
  return (
    <div className={styles["add-items"]}>
      <form className="row ak-row" onSubmit={handleOnSubmit}>
        <div className="col-6">
          <input
            type="text"
            placeholder="Enter Todo Task Here"
            className="input"
            onChange={handleTodoTaskOnChange}
            value={todoTask}
          />
        </div>
        <div className="col-4">
          <input
            type="date"
            className="input"
            onChange={handleDueDateChange}
            value={dueDate}
          />
        </div>
        <div className="col-2">
          <button type="submit" className="btn btn-success ak-button">
            <IoMdAdd />
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;
