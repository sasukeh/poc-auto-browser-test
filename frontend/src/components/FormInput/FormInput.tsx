'use client';

import { inputMessageToReduxStore } from '@/features/messageSlice';
import { useAppDispatch } from '@/hooks/useRTK';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const FormInput = () => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const sendMessage = async () => {
    setIsLoading(true);
    // Send human message to the redux store
    dispatch(
      inputMessageToReduxStore({
        pathname,
        message,
        isMan: true,
      })
    );

    // Send message to the OpenAI
    const url = '/api/agent';
    console.log('🚀 ~ sendMessage ~ url:', url);
    const response = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const { result } = await response.json();
    // Send OpenAI message to the redux store
    dispatch(
      inputMessageToReduxStore({
        pathname,
        message: result,
        isMan: false,
      })
    );

    // Agent Testを実行する
    const webapp_url = '/api/webapps';
    console.log('🚀 ~ sendMessage ~ url:', webapp_url);
    const res = await fetch(`${webapp_url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    console.log('🚀 ~ sendMessage ~ res:', res);

    setMessage('');
    setIsLoading(false);
    dispatch(
      inputMessageToReduxStore({
        pathname,
        message:
          '🤖Agentの作業が完了しました🤖 結果はTest Resultをご確認ください。',
        isMan: false,
      })
    );
  };

  return (
    <div className="w-full justify-center items-center">
      <label htmlFor="chat" className="sr-only">
        AI Agentに実行してほしい作業をお伝えください。
      </label>
      <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50">
        <textarea
          id="chat"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="AI Agentに実行してほしい作業をお伝えください。"
        ></textarea>
        <button
          onClick={sendMessage}
          className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 "
        >
          {!isLoading ? (
            <svg
              className="w-5 h-5 rotate-90 rtl:-rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
          ) : (
            <div className="flex justify-center" aria-label="読み込み中">
              <div className="animate-spin w-5 h-5 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          )}
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </div>
  );
};

export default FormInput;
