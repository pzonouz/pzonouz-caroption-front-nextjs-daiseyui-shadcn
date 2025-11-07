// app/not-found.tsx
export default function NotFound() {
  return (
    <div
      style={{
        fontFamily: "IranSans, sans-serif",
        textAlign: "center",
        padding: "4rem",
        backgroundColor: "#fefefe",
        color: "#333",
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "#e63946" }}>
        ۴۰۴ - صفحه پیدا نشد 😢
      </h1>
      <p style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
        صفحه‌ای که دنبالش بودی یا حذف شده یا هیچ‌وقت وجود نداشته!
      </p>
      <img
        src="https://media.giphy.com/media/3o6ZsY8TtFqVJZzU3O/giphy.gif"
        alt="404 funny gif"
        style={{ maxWidth: "400px", margin: "2rem auto" }}
      />
      <p style={{ fontSize: "1.2rem" }}>
        نگران نباش! می‌تونی از{" "}
        <a href="/" style={{ color: "#1d3557", textDecoration: "underline" }}>
          صفحه اصلی
        </a>{" "}
        شروع کنی یا از منوی بالا استفاده کنی.
      </p>
    </div>
  );
}
