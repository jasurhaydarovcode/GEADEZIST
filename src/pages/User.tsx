import React, { useState, useEffect } from "react";
import Layout from "@/components/Dashboard/Layout";
import { FcSearch } from "react-icons/fc";
import { SlArrowDown } from "react-icons/sl";
import { Link } from "react-router-dom";
import axios from "axios";

interface UserResult {
  id: number;
  fullName: string;
  category: string;
  phone: string;
  status: string;
  expirationDate: string;
}

function User() {
  const [results, setResults] = useState<UserResult[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedResult, setSelectedResult] = useState<UserResult | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Foydalanuvchilar natijalarini olish
  const fetchResults = async () => {
    try {
      const response = await axios.get("http://164.92.165.18:8090/result/results/");
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // Tasdiqlash modalni ochish
  const openConfirmModal = (result: UserResult) => {
    setSelectedResult(result);
    setModalOpen(true);
  };

  // Tasdiqlash funksiyasi
  const handleConfirm = async () => {
    if (selectedResult) {
      try {
        await axios.put(`http://164.92.165.18:8090/result/update-status/${selectedResult.id}`, {
          status: "Tasdiqlandi",
        });
        setModalOpen(false);
        fetchResults();
      } catch (error) {
        console.error("Error confirming result:", error);
      }
    }
  };

  return (
    <Layout>
      <div className="flex justify-center pt-7">
        <div className="px-8 w-full">
          <header className="flex items-center justify-between">
            <h3 className="font-bold text-[27px]">Foydalanuvchilar natijasi</h3>
            <div className="flex gap-2 text-[18px]">
              <Link to={'/dashboard'}>
                <h4>Boshqaruv paneli</h4>
              </Link>
              <h4>/</h4>
              <h4 className="text-blue-600">Foydalanuvchilar</h4>
            </div>
          </header>

          <div className="flex justify-end pt-5 gap-5">
            <div className="flex">
              <label htmlFor="inp1">
                <FcSearch className="absolute mt-4 ml-3 text-[20px]" />
              </label>
              <input
                type="text"
                id="inp1"
                className="pl-10 w-[375px] border-gray-300 rounded-md h-[50px]"
                placeholder="F.I.O qidirish"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="max-w-[350px] w-[375px] rounded-md h-[50px] border-gray-400"
            >
              <option value="">Statusni tanlang</option>
              <option value="Tasdiqlandi">Tasdiqlangan</option>
              <option value="Bekor qilingan">Bekor qilingan</option>
              <option value="Kutilmoqda">Kutilmoqda</option>
            </select>
          </div>

          {/* Foydalanuvchi natijalari jadvali */}
          <table className="w-full mt-5">
            <thead>
              <tr>
                <th>T/R</th>
                <th>To'liq ismi</th>
                <th>Kategoriya</th>
                <th>Telefon</th>
                <th>Qayta test qilish muddati</th>
                <th>Status</th>
                <th>Harakat</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={result.id}>
                  <td>{index + 1} jhbdkjbrkebkbb</td>
                  <td>{result.fullName} jhsrjvbjbsjrvbh</td>
                  <td>{result.category}</td>
                  <td>{result.phone}</td>
                  <td>{result.expirationDate}</td>
                  <td>{result.status}</td>
                  <td>
                    <button onClick={() => openConfirmModal(result)}>
                      Tasdiqlash
                    </button>
                    <button onClick={() => {/* Bekor qilish funksiyasi */}}>
                      Bekor qilish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal tasdiqlash va baho berish uchun */}
          {modalOpen && selectedResult && (
            <div className="modal">
              <div className="modal-content">
                <h3>{selectedResult.fullName} natijasi</h3>
                <div>
                  <label htmlFor="rating">Baho qo'ying (1-10):</label>
                  <input
                    type="number"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    min={1}
                    max={10}
                    className="input"
                  />
                </div>
                <div className="modal-actions">
                  <button onClick={() => setModalOpen(false)}>Yopish</button>
                  <button
                    onClick={handleConfirm}
                    disabled={rating < 1 || rating > 10}
                  >
                    Saqlash
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default User;
