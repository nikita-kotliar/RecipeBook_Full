// import { ColorRing } from "react-loader-spinner";

// const LoaderComponent = ({ width, height }) => {
//   return (
//     <ColorRing
//       visible={true}
//       height={height}
//       width={width}
//       ariaLabel="color-ring-loading"
//       wrapperStyle={{}}
//       wrapperClass="color-ring-wrapper"
//       colors={["#9be1a0", "#f0eff4", "#ffffffea", "#87d28d", "#323f47"]}
//     />
//   );
// };

// export default LoaderComponent;

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

const LoaderComponent = () => {
  return (
    <div className="stirring-loader">
      <svg viewBox="0 0 200 200" width="160" height="160">
        {/* Каструля */}
        <ellipse cx="100" cy="140" rx="60" ry="20" fill="#555" />
        <rect x="40" y="70" width="120" height="70" rx="15" fill="#87d28d" />
        <ellipse cx="100" cy="70" rx="60" ry="15" fill="#4a7c59" />
        
        {/* Суп */}
        <ellipse cx="100" cy="70" rx="50" ry="12" fill="#f5d6a0" />
        <circle cx="85" cy="68" r="2" fill="#d67f2d" />
        <circle cx="110" cy="72" r="2" fill="#d67f2d" />
        <circle cx="95" cy="66" r="2" fill="#d67f2d" />

        {/* Ложка */}
        <g className="spoon" transform="rotate(0, 100, 70)">
          <rect x="97" y="40" width="6" height="30" rx="3" fill="#a76f49" />
          <ellipse cx="100" cy="40" rx="10" ry="6" fill="#c49a6c" />
        </g>
      </svg>

      <style jsx>{`
        .stirring-loader {
          display: flex;
          justify-content: center;
          align-items: center;
          animation: pop 0.6s ease-in-out infinite alternate;
        }

        .spoon {
          transform-origin: 100px 70px;
          animation: stir 1.5s infinite ease-in-out;
        }

        @keyframes stir {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(20deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes pop {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.02);
          }
        }
      `}</style>
    </div>
  );
};

export default LoaderComponent;
