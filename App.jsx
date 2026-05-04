import { useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function App() {
  const [array, setArray] = useState([64, 25, 12, 22, 11, 90, 34, 50]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [minIndex, setMinIndex] = useState(-1);
  const [sortedIndex, setSortedIndex] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const generateArray = () => {
    if (isSorting) return;

    const newArray = Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 90) + 10
    );

    setArray(newArray);
    setSortedIndex([]);
    setCurrentIndex(-1);
    setMinIndex(-1);
  };

  const selectionSort = async () => {
    if (isSorting) return;

    setIsSorting(true);

    let arr = [...array];
    let sorted = [];

    for (let i = 0; i < arr.length; i++) {
      let min = i;

      setMinIndex(min);

      for (let j = i + 1; j < arr.length; j++) {
        setCurrentIndex(j);

        if (arr[j] < arr[min]) {
          min = j;
          setMinIndex(min);
        }

        await sleep(400);
      }

      [arr[i], arr[min]] = [arr[min], arr[i]];
      setArray([...arr]);

      sorted.push(i);
      setSortedIndex([...sorted]);

      await sleep(400);
    }

    setCurrentIndex(-1);
    setMinIndex(-1);
    setIsSorting(false);
  };

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>DEMO SELECTION SORT</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={generateArray}>
          Generate Array
        </button>

        <button
          onClick={selectionSort}
          style={{ marginLeft: "10px" }}
        >
          Start Sorting
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: "10px",
          height: "400px",
          overflowX: "auto",
        }}
      >
        {array.map((value, index) => {
          let color = "gray";

          if (sortedIndex.includes(index)) {
            color = "green";
          } else if (index === minIndex) {
            color = "red";
          } else if (index === currentIndex) {
            color = "yellow";
          }

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: "50px",
              }}
            >
              <div>{value}</div>

              <div
                style={{
                  width: "50px",
                  height: `${value * 3}px`,
                  background: color,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {index}
              </div>
            </div>
          );
        })}
      </div>
      <SpeedInsights />
    </div>
  );
}