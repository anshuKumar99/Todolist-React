import { useContext } from "react";
import styles from "./AddItems.module.css";
import { MdDelete } from "react-icons/md";
import { TodoItemsContext } from "../store/todoItems-store";

function AddItems({ todoName, todoDate }) {
  const { deleteItem } = useContext(TodoItemsContext);
  return (
    <div className={styles["items-container"]}>
      <div className="row ak-row">
        <div className="col-6">{todoName}</div>
        <div className="col-4">{todoDate}</div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-danger ak-button"
            onClick={() => deleteItem(todoName)}
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddItems;
