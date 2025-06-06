import { ColorRing } from "react-loader-spinner";
const LoaderComponent = ({ width, height }) => {
  return (
    <ColorRing
      visible={true}
      height={height}
      width={width}
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
    />
  );
};
export default LoaderComponent;
// FlippingLoader.jsx
// const LoaderComponent = ({ size = 40, color = "#9be1a0" }) => {
//   const squares = Array.from({ length: 4 });
//   return (
//     <div className="flipping-loader">
//       {squares.map((_, i) => (
//         <div key={i} className="square" style={{ animationDelay: `${i * 0.2}s` }} />
//       ))}
//       <style jsx>{`
//         .flipping-loader {
//           display: flex;
//           gap: 8px;
//         }
//         .square {
//           width: ${size}px;
//           height: ${size}px;
//           background: ${color};
//           animation: flip 1.2s infinite ease-in-out;
//         }
//         @keyframes flip {
//           0%, 100% {
//             transform: rotateY(0deg);
//             opacity: 1;
//           }
//           50% {
//             transform: rotateY(180deg);
//             opacity: 0.5;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };
// export default LoaderComponent;
// CookingLoader.jsx
// const LoaderComponent = () => {
//   return (
//     <div className="cooking-loader">
//       <svg viewBox="0 0 200 200" width="120" height="120">
//         <g>
//           <rect x="50" y="100" width="100" height="40" rx="10" fill="#87d28d" />
//           <rect x="40" y="90" width="120" height="10" fill="#4a7c59" />
//           <circle className="steam" cx="80" cy="80" r="6" fill="#ffffffaa" />
//           <circle className="steam" cx="100" cy="70" r="6" fill="#ffffffaa" />
//           <circle className="steam" cx="120" cy="80" r="6" fill="#ffffffaa" />
//         </g>
//       </svg>

//       <style jsx>{`
//         .cooking-loader {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }

//         .steam {
//           animation: rise 1.5s infinite ease-in-out;
//         }

//         .steam:nth-child(3) {
//           animation-delay: 0s;
//         }
//         .steam:nth-child(4) {
//           animation-delay: 0.3s;
//         }
//         .steam:nth-child(5) {
//           animation-delay: 0.6s;
//         }

//         @keyframes rise {
//           0% {
//             transform: translateY(0) scale(1);
//             opacity: 0.8;
//           }
//           50% {
//             transform: translateY(-20px) scale(1.2);
//             opacity: 0.4;
//           }
//           100% {
//             transform: translateY(-40px) scale(0.8);
//             opacity: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LoaderComponent;

// const LoaderComponent = () => {
//   return (
//     <div className="stirring-loader">
//       <svg viewBox="0 0 200 200" width="160" height="160">
//         {/* Каструля */}
//         <ellipse cx="100" cy="140" rx="60" ry="20" fill="#555" />
//         <rect x="40" y="70" width="120" height="70" rx="15" fill="#87d28d" />
//         <ellipse cx="100" cy="70" rx="60" ry="15" fill="#4a7c59" />
        
//         {/* Суп */}
//         <ellipse cx="100" cy="70" rx="50" ry="12" fill="#f5d6a0" />
//         <circle cx="85" cy="68" r="2" fill="#d67f2d" />
//         <circle cx="110" cy="72" r="2" fill="#d67f2d" />
//         <circle cx="95" cy="66" r="2" fill="#d67f2d" />

//         {/* Ложка */}
//         <g className="spoon" transform="rotate(0, 100, 70)">
//           <rect x="97" y="40" width="6" height="30" rx="3" fill="#a76f49" />
//           <ellipse cx="100" cy="40" rx="10" ry="6" fill="#c49a6c" />
//         </g>
//       </svg>

//       <style jsx>{`
//         .stirring-loader {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           animation: pop 0.6s ease-in-out infinite alternate;
//         }

//         .spoon {
//           transform-origin: 100px 70px;
//           animation: stir 1.5s infinite ease-in-out;
//         }

//         @keyframes stir {
//           0% {
//             transform: rotate(0deg);
//           }
//           50% {
//             transform: rotate(20deg);
//           }
//           100% {
//             transform: rotate(0deg);
//           }
//         }

//         @keyframes pop {
//           from {
//             transform: scale(1);
//           }
//           to {
//             transform: scale(1.02);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LoaderComponent;
// import React from "react";

// const LoaderComponent = () => {
//   return (
//     <>
//       <style>{`
//         .loader {
//           position: relative;
//           width: 140px;
//           height: 140px;
//           margin: auto;
//           perspective: 600px;
//         }
//         .loader__orbit {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           border-radius: 50%;
//           transform-style: preserve-3d;
//           animation-timing-function: linear;
//           animation-iteration-count: infinite;
//           box-shadow:
//             0 0 15px 5px rgba(72, 180, 255, 0.6),
//             inset 0 0 20px 6px rgba(72, 180, 255, 0.9);
//         }
//         .orbit1 {
//           width: 120px;
//           height: 120px;
//           margin-left: -60px;
//           margin-top: -60px;
//           border: 2px solid transparent;
//           animation-name: spin1;
//           animation-duration: 12s;
//           background: linear-gradient(45deg, #48b4ff, #0f72b6);
//           filter: drop-shadow(0 0 12px #48b4ff);
//         }
//         .orbit2 {
//           width: 90px;
//           height: 90px;
//           margin-left: -45px;
//           margin-top: -45px;
//           animation-name: spin2;
//           animation-duration: 9s;
//           background: linear-gradient(135deg, #00ff99, #007f56);
//           box-shadow:
//             0 0 12px 3px rgba(0, 255, 153, 0.8),
//             inset 0 0 15px 4px rgba(0, 255, 153, 1);
//           filter: drop-shadow(0 0 10px #00ff99);
//         }
//         .orbit3 {
//           width: 60px;
//           height: 60px;
//           margin-left: -30px;
//           margin-top: -30px;
//           animation-name: spin3;
//           animation-duration: 6s;
//           background: radial-gradient(circle, #ff66cc, #cc0077);
//           box-shadow:
//             0 0 10px 3px rgba(255, 102, 204, 0.7),
//             inset 0 0 12px 3px rgba(204, 0, 119, 1);
//           filter: drop-shadow(0 0 8px #ff66cc);
//         }

//         @keyframes spin1 {
//           from { transform: rotateY(0deg) rotateX(0deg); }
//           to { transform: rotateY(360deg) rotateX(360deg); }
//         }
//         @keyframes spin2 {
//           from { transform: rotateX(0deg) rotateZ(0deg); }
//           to { transform: rotateX(360deg) rotateZ(360deg); }
//         }
//         @keyframes spin3 {
//           from { transform: rotateZ(0deg) rotateY(0deg); }
//           to { transform: rotateZ(360deg) rotateY(360deg); }
//         }

//         .loader__core {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           width: 30px;
//           height: 30px;
//           margin-left: -15px;
//           margin-top: -15px;
//           border-radius: 50%;
//           background: radial-gradient(circle at center, #fff, #88ddff 80%);
//           box-shadow:
//             0 0 15px 6px #88ddff,
//             0 0 25px 12px #66bbff;
//           animation: pulseCore 1.6s ease-in-out infinite;
//           filter: drop-shadow(0 0 12px #88ddff);
//         }

//         @keyframes pulseCore {
//           0%, 100% {
//             transform: scale(1);
//             opacity: 1;
//             box-shadow:
//               0 0 15px 6px #88ddff,
//               0 0 25px 12px #66bbff;
//           }
//           50% {
//             transform: scale(1.3);
//             opacity: 0.8;
//             box-shadow:
//               0 0 25px 12px #88ddff,
//               0 0 40px 18px #66bbff;
//           }
//         }
//       `}</style>

//       <div className="loader">
//         <div className="loader__orbit orbit1"></div>
//         <div className="loader__orbit orbit2"></div>
//         <div className="loader__orbit orbit3"></div>
//         <div className="loader__core"></div>
//       </div>
//     </>
//   );
// };

// export default LoaderComponent;
