import { useState } from "react";
import logo from "./logo.svg";

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
  return (
    <div className="app">
      <Header />
      <Form item={item} setItem={setItem} />
      <PackingList
        item={item}
        onDeleteItem={handleDelete}
        onUpdateItem={handleUpdate}
      />
      <Stats item={item} />
    </div>
  );
}

export default App;

function Header() {
  return <h1>🏝 Far Away 🎄🥾</h1>;
}

function Form({ item, setItem }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      description: description,
      amount: amount,
      packed: false,
      id: Date.now(),
    };
    setItem([...item, newItem]);
    setAmount(1);
    setDescription("");
  };
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip</h3>
      <select
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ item, onDeleteItem, onUpdateItem }) {
  return (
    <div className="list">
      <ul>
        {item.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Stats({ item }) {
  if (!item.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your list </em>
      </footer>
    );

  let packed = item?.reduce(
    (count, obj) => (obj.packed == true ? count + 1 : count),
    0
  );
  return (
    <footer className="stats">
      <em>{`These  are ${
        item.length
      } items in your bag.And you have already packed ${packed}(${
        (packed / item.length) * 100
      }%)`}</em>
    </footer>
  );
}

function Item({ item, onDeleteItem, onUpdateItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onUpdateItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.amount}: {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
