import { useState } from "react";
import logo from "./logo.svg";

function App() {
  const [item, setItem] = useState([]);
  return (
    <div className="app">
      <Header />
      <Form item={item} setItem={setItem} />
      <PackingList item={item} />
      <Stats num={item.length} />
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

function PackingList({ item }) {
  console.log(item, "item");
  return (
    <div className="list">
      <ul>
        {item.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  );
}

function Stats({ num }) {
  return (
    <footer className="stats">
      <em>{`These  are ${num} items in your bag`}</em>
    </footer>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.amount}: {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
