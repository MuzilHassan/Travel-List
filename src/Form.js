import { useState } from "react";
export default function Form({ item, setItem }) {
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
