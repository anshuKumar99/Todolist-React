// Importing useContext from react
import { useContext } from "react";

// Importing TodoItemsContext from store
import { TodoItemsContext } from "../store/todoItems-store";

// Importing css from TodoItemsList.module.css
import styles from "./TodoItemsList.module.css";

// Importing Elements from Components
import AddItems from "./AddItems";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const TodoItemsList = () => {
  // Using useContext for getting todoItems and fetching from TodoItemsContext
  const { todoItems, fetching } = useContext(TodoItemsContext);

  return (
    <>
      {/* TodoItems List container */}
      <div className={styles.TodoItemsList}>
        {/* LoadingSpinner Component */}
        {fetching && <LoadingSpinner />}

        {/* WelcomeMessage Component */}
        {!fetching && todoItems.length === 0 && <WelcomeMessage />}

        {/* TodoItems List */}
        {!fetching &&
          todoItems.map((item) => <AddItems key={item.id} todoItem={item} />)}
      </div>
    </>
  );
};

//exporting TodoItemsList component
export default TodoItemsList;
