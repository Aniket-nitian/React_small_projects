import Card from "./components/card";

export default function App() {
  let myobj = {
    name: "Aniket",
    age: 21,
    gender: "male",
  };
  let newArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <h1 className="bg-green-400 text-black p-4 rounded-xl mb-4">
        Tailwind test
      </h1>
      <Card userName="Aniket" someObj={myobj} someArr={newArr} />
      <Card userName="Chauhan" />
    </>
  );
}
