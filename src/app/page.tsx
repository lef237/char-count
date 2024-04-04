"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">文字数カウントアプリ</h1>
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="テキストを入力してください..."
          className="w-full h-40 p-3 mb-4 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-lg text-gray-600">文字数: {text.length}</p>
      </div>
      <footer className="mt-6 text-center text-gray-500 text-sm">
        Created by <a href="https://github.com/lef237" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">lef237</a>
      </footer>
    </div>
  );
}
