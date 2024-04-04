"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(
      () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      },
      (err) => {
        console.error("クリップボードへのコピーに失敗しました: ", err);
      }
    );
  };

  const Toast = () => (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-green-100 text-green-800 rounded-lg shadow-md transition-opacity duration-300 ${
        showToast ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      テキストがクリップボードにコピーされました！
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md relative">
        <h1 className="text-3xl font-bold mb-6">文字数カウントアプリ</h1>
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="テキストを入力してください..."
          className="w-full min-h-[120px] p-3 mb-4 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <p className="text-lg text-gray-600">文字数: {text.length}</p>
        <button
          onClick={copyToClipboard}
          className="absolute bottom-4 right-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          Copy
        </button>
      </div>
      <Toast />
      <footer className="m-6 text-center text-gray-500 text-sm">
        Created by{" "}
        <a
          href="https://github.com/lef237"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          lef237
        </a>
      </footer>
    </div>
  );
}
