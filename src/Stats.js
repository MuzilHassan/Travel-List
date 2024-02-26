export function Stats({ item }) {
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
