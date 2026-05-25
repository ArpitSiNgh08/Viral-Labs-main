// GlobalTexture.jsx
export default function GlobalTexture() {
  return (
    <div
      className="pointer-events-none absolute inset-0 mix-blend-lighten z-[20] opacity-30"
      style={{
        backgroundImage: "url('/images/textures.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-hidden="true"
    />
  );
}