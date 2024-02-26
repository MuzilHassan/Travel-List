import { useState } from "react";
import { Item } from "./Item";

export function PackingList({ item, onDeleteItem, onUpdateItem, onClearList }) {
  const [sortby, setSortBy] = useState("input");

  let sortedItems;
  if (sortby === "input") sortedItems = item;
  if (sortby === "description")
    sortedItems = item
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  console.log(sortedItems);
  if (sortby === "packed")
    sortedItems = item
      .slice()
      .sort((a, b) => Number(b.packed) - Number(a.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </ul>
      <div>
        <select value={sortby} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input Order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
