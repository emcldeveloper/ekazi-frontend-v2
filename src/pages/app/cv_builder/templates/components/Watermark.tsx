// Ekazi tie watermark — base64 embedded PNG, self-contained for html2pdf
const EKAZI_TIE_SRC =
  "data:image/png;base64,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";

export default function Watermark() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 50,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.06,
          width: "50%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={EKAZI_TIE_SRC}
          alt=""
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </div>
  );
}

// <div
//   style={{
//     position: "absolute",
//     inset: 0,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     pointerEvents: "none",
//     zIndex: 20,
//     transform: "rotate(-35deg)",
//   }}
// >
//   {logoSrc ? (
//     <img
//       src={logoSrc}
//       alt="watermark"
//       style={{ width: 500, opacity: 0.07 }}
//     />
//   ) : (
//     <span
//       style={{
//         fontSize: 72,
//         fontWeight: 700,
//         color: "#000",
//         opacity: 0.06,
//         whiteSpace: "nowrap",
//       }}
//     >
//       ekazi.co.tz
//     </span>
//   )}
// </div>
