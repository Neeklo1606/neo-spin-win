import "./BubblesBackground.css";

const bubbles = Array.from({ length: 12 }, (_, i) => {
  const size = 20 + Math.round((i * 60) / 11);
  const duration = 10 + (i % 5) * 3;
  const delay = (i * 1.36).toFixed(1);
  const left = ((i * 8.3 + 3) % 100).toFixed(0);
  return { size, duration, delay, left };
});

const BubblesBackground = () => (
  <>
    {bubbles.map((b, i) => (
      <div
        key={i}
        className="bubble"
        style={{
          width: b.size,
          height: b.size,
          left: `${b.left}%`,
          animationDuration: `${b.duration}s`,
          animationDelay: `${b.delay}s`,
        }}
      />
    ))}
  </>
);

export default BubblesBackground;
