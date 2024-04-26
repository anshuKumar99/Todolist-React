import { useContext } from "react";
import { TodoItemsContext } from "../store/todoItems-store";
import styles from "./WelcomeMessage.module.css";

const WelcomeMessage = () => {
  const todoItems = useContext(TodoItemsContext).todoItems;
  return (
    todoItems.length === 0 && <p className={styles.message}>Enjoy Your Day</p>
  );
};

export default WelcomeMessage;
