import { useState } from "react";
import Header from "./Header";
import Form from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";

function App() {
  const [item, setItem] = useState([]);

  const handleDelete = function (id) {
    setItem((item) => item.filter((item) => item.id != id));
  };
  const handleUpdate = (id) => {
    setItem((item) =>
      item.map((item) =>
        item.id == id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleClear = () => {
    let confirmed = window.confirm(
      "Do you really want to clear your packing list?"
    );
    if (confirmed) setItem([]);
  };
  return (
    <div className="app">
      <Header />
      <Form item={item} setItem={setItem} />
      <PackingList
        item={item}
        onDeleteItem={handleDelete}
        onUpdateItem={handleUpdate}
        onClearList={handleClear}
      />
      <Stats item={item} />
    </div>
  );
}

export default App;
