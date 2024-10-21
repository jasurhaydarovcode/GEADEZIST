// import { Modal } from 'antd';
// import React from 'react';

// // Answer interfeysi
// interface Answer {
//     id: number;
//     checked?: boolean;
// }



// const EditModal: React.FC<EditModalProps> = ({
//     editModal,
//     editMod,
//     confirmLoad,
//     closeditmod,
//     setanswer,
//     setCategory,
//     setDifficulty,
//     setTestType,
//     setType,
//     categoryNames = [],
//     testType,
//     answers = [],
//     setAnswers,
//     handleAddAnswer,
//     handleRemoveAnswer,
// }) => {
//     return (
//         <Modal
//             title="edit modal"
//             open={editModal}
//             onOk={editMod}
//             confirmLoading={confirmLoad}
//             onCancel={closeditmod}
//             maskClosable={false}
//         >
//             <div className="mb-4">
//                 <input
//                     onChange={(e) => setanswer(e.target.value)}
//                     placeholder="Savolni kiriting"
//                     className="border w-full p-2 rounded"
//                 />
//             </div>

//             <div className="mb-4">
//                 <select onChange={(e) => setCategory(e.target.value)} className="w-full text-gray-400 bg-white rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]">
//                     <option disabled selected value="">
//                         Kategoriyani tanlang
//                     </option>
//                     <option value="SUM" className="text text-black">
//                         Umumiy savollar
//                     </option>
//                     <option value="" className="text text-black">
//                         Umumiy geodeziya
//                     </option>
//                     <option value="" className="text text-black">
//                         Topografiya
//                     </option>
//                     <option value="" className="text text-black">
//                         Oliy geodeziya
//                     </option>
//                     <option value="" className="text text-black">
//                         Har qanday to'g'ri
//                     </option>
//                 </select>
//             </div>

//             <div className="mb-4">
//                 <select onChange={(e) => setDifficulty(e.target.value)} className="w-full text-gray-400 bg-white rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]">
//                     <option disabled selected>
//                         Qiyinchilik darajasini tanlang
//                     </option>
//                     <option value="HARD" className="text text-black">
//                         Qiyin
//                     </option>
//                     <option value="EASY" className="text text-black">
//                         Oson
//                     </option>
//                     <option value="NEDIUM" className="text text-black">
//                         O'rta
//                     </option>
//                 </select>
//             </div>

//             <div className="mb-4">
//                 <select
//                     onChange={(e) => {
//                         setTestType(e.target.value)
//                         setType(e.target.value)
//                     }}
//                     className="w-full text-gray-400 bg-white rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]"
//                 >
//                     <option disabled selected>
//                         Turlarni tanlang
//                     </option>
//                     {categoryNames &&
//                         categoryNames.length > 0 &&
//                         categoryNames.map((category, key) => (
//                             <option
//                                 key={key}
//                                 value={category.name}
//                                 className="text text-black"
//                             >
//                                 {category.name}
//                             </option>
//                         ))}
//                 </select>
//             </div>

//             <div>
//                 {testType !== null && // Show inputs only when testType is not null
//                     (testType === "Hisoblangan natija" ||
//                         testType === "Ko'p to'g'ri javobli test") &&
//                     answers.map((answer: Answer, index) => (
//                         <div key={answer.id} className="flex items-center mb-4 gap-2">
//                             <input
//                                 type="checkbox"
//                                 checked={testType === "Hisoblangan natija" || answer.checked} // Automatically checked for "Hisoblangan natija", manually for multiple answers
//                                 onChange={(e) => {
//                                     if (testType === "Ko'p to'g'ri javobli test") {
//                                         const updatedAnswers = answers.map((ans, i) =>
//                                             i === index
//                                                 ? { ...ans, checked: e.target.checked }
//                                                 : ans
//                                         );
//                                         setAnswers(updatedAnswers);
//                                     }
//                                 }}
//                                 disabled={testType === "Hisoblangan natija"} // Disable for "Hisoblangan natija"
//                                 className="mr-3 accent-blue-500"
//                             />
//                             <input
//                                 placeholder="Savolning javoblarini kiriting"
//                                 className="border w-full p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <label className="cursor-pointer custom-file-upload px-3 w-[160px] py-2 bg-blue-500 text-white text-[13px] rounded-md">
//                                 <input type="file" className="hidden" />
//                                 Choose file
//                             </label>
//                             {testType === "Ko'p to'g'ri javobli test" && (
//                                 <>
//                                     <button
//                                         onClick={handleRemoveAnswer}
//                                         className="bg-gray-300 hover:bg-gray-400 text-lg px-3 rounded-md border border-gray-300 ml-2"
//                                     >
//                                         -
//                                     </button>
//                                     <button
//                                         onClick={handleAddAnswer}
//                                         className="bg-gray-300 hover:bg-gray-400 text-lg px-3 rounded-md border border-gray-300"
//                                     >
//                                         +
//                                     </button>
//                                 </>
//                             )}
//                         </div>
//                     ))}
//             </div>

//             <div>
//                 {testType !== null && // Show inputs only when testType is not null
//                     testType === "Bir to'g'ri javobli test" &&
//                     answers.map((answer) => (
//                         <div key={answer.id} className="flex items-center mb-4 gap-1">
//                             <input
//                                 type="radio"
//                                 name="single-choice"
//                                 className="mr-3 accent-blue-500"
//                             />
//                             <input
//                                 placeholder="Savolning javoblarini kiriting"
//                                 className="border w-full p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <label className="cursor-pointer custom-file-upload px-3 w-[150px] py-2 bg-blue-500 text-white text-[13px] rounded-md">
//                                 <input type="file" className="hidden" />
//                                 Choose file
//                             </label>
//                             <>
//                                 <button
//                                     onClick={handleRemoveAnswer}
//                                     className="bg-gray-300 hover:bg-gray-400 text-lg px-3 rounded-md border border-gray-300 ml-2"
//                                 >
//                                     -
//                                 </button>
//                                 <button
//                                     onClick={handleAddAnswer}
//                                     className="bg-gray-300 hover:bg-gray-400 text-lg px-3 rounded-md border border-gray-300"
//                                 >
//                                     +
//                                 </button>
//                             </>
//                         </div>
//                     ))}
//             </div>


//             <div className="mb-4 ml-[180px] mt-5 ">
//                 <label className="w-[90px] h-[90px] rounded border-dashed border-2 border-gray-400 bg-yellow-100 flex flex-col items-center justify-center">
//                     <input type="file" className="hidden" />
//                     <img
//                         src="https://example.com/your-icon.png"
//                         alt="Rasm yuklash"
//                         className="w-6 h-6"
//                     />
//                     Rasm yuklash
//                 </label>
//                 <h2 className="mt-2 relative right-[20px]">Rasm yuklash ixtiyoriy</h2>{" "}
//             </div>

//             {/* Qolgan kontentni modal ichiga joylang */}
//         </Modal>
//     );
// };

// export default EditModal;
