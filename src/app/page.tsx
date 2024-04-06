"use client";

import { SetStateAction, useState } from "react";
// @ts-expect-error 型定義が存在しない
import { splitGraphemes } from "split-graphemes";

export default function Home() {
  const [text, setText] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e: {
    target: {
      value: SetStateAction<string>;
      style: { height: string };
      scrollHeight: number;
    };
  }) => {
    setText(e.target.value);

    // テキストエリアの高さを調整する前のスクロール位置を保存
    const initialScrollTop =
      window.scrollY || document.documentElement.scrollTop;

    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;

    // スマートフォンの場合、スクロール位置を元に戻さない（カクカクするため）
    if (/Mobi/i.test(navigator.userAgent)) {
      return;
    }

    // テキストエリアの高さが変更された後、保存したスクロール位置に戻す
    window.scrollTo({
      top: initialScrollTop,
      behavior: "auto",
    });
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
      className={`fixed top-4 p-4 bg-green-100 text-green-800 rounded-lg shadow-md transition-opacity duration-300 ${
        showToast ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <p className="text-sm">テキストがクリップボードにコピーされました！</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md relative">
        <h1 className="text-3xl font-bold mb-6 text-black">
          文字数カウントアプリ
        </h1>
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="テキストを入力してください..."
          className="w-full min-h-[120px] p-3 mb-4 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <p className="text-lg text-gray-600">
          文字数: {splitGraphemes(text).length}
        </p>
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
