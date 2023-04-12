import { photos } from "./db";
import Photo from "./Photo.";
import VanillaTilt from "vanilla-tilt";
import { useEffect, useRef } from "react";

export default function App() {
  const tilt = useRef([]);

  useEffect(() => {
    tilt.current.forEach((el) => {
      VanillaTilt.init(el, {
        scale: 1.01,
        speed: 300,
        max: 10,
        axis: "x",
      });
    });
  }, [tilt]);

  return (
    <div className="App">
      <div className="photo">
        {photos.map((url, i) => (
          <div ref={(el) => (tilt.current[i] = el)}>
            <Photo key={i} name={`Photo #${i}`} imageUrl={url} />
          </div>
        ))}
      </div>
    </div>
  );
}
