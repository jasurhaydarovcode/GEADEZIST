// import React, { useState } from "react";

// interface ResultModalProps {
//   user: any;
//   onClose: () => void;
// }

// const UserResult: React.FC<ResultModalProps> = ({ user, onClose }) => {
//   const [score, setScore] = useState<number | null>(null);
//   const [error, setError] = useState("");

//   const handleSave = () => {
//     if (score === null || score < 1 || score > 10) {
//       setError("Baho 1 va 10 orasida bo'lishi kerak.");
//       return;
//     }
//     // Save logic here
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-8 rounded-lg w-[500px]">
//         <h3 className="text-xl font-bold">Foydalanuvchi Natijasi</h3>
//         <p><strong>To'liq ismi:</strong> {user.name}</p>
//         <p><strong>Kategoriya:</strong> Topografiya</p>
//         <p><strong>Nateja:</strong> ...</p> {/* You can dynamically show the results here */}
//         <p><strong>Ishlash davomiyligi:</strong> 1 soat</p>
//         <p><strong>Ishlangan sanasi:</strong> 2024-10-14</p>

//         {/* Score Input */}
//         <div className="mt-4">
//           <label>Baho qo'ying (1-10):</label>
//           <input
//             type="number"
//             value={score || ""}
//             onChange={(e) => setScore(Number(e.target.value))}
//             className="border p-2 w-full mt-2"
//             min={1}
//             max={10}
//           />
//           {error && <p className="text-red-600">{error}</p>}
//         </div>

//         {/* Buttons */}
//         <div className="mt-6 flex justify-between">
//           <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
//             Yopish
//           </button>
//           <button
//             className={`bg-blue-600 text-white px-4 py-2 rounded ${!score ? "opacity-50" : ""}`}
//             onClick={handleSave}
//             disabled={!score}
//           >
//             Saqlash
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserResult;
