// Importing App.css
import "./App.css";

// Importing Elements from Components
import AddTodo from "./Components/AddTodo";
import AppHeading from "./Components/AppHeading";
import TodoItemsList from "./Components/TodoItemsList";

// Importing TodoItemsContextProvider from store
import TodoItemsContextProvider from "./store/todoItems-store";

function App() {
  return (
    <TodoItemsContextProvider>
      <center>
        <div className="header">
          <AppHeading />
          <AddTodo />
          <hr />
        </div>
        <TodoItemsList />
      </center>
    </TodoItemsContextProvider>
  );
}

//exporting App component
export default App;
