'use client';
import QueryResultTable from '@/components/QueryResultTable/QueryResultTable';
import { useEffect, useState } from 'react';

export default function TestResult() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log('🚀 ~ TestResult ~ data:', data);
  useEffect(() => {
    setIsLoading(true);
    document.title = 'Test Result Page';
    selectItem();
    setIsLoading(false);
  }, []);

  const selectItem = async () => {
    setIsLoading(true);
    const url = '/api/cosmos/select';
    const response = await fetch(`${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('🚀 ~ selectItem ~ response:', response);
    const { result } = await response.json();
    console.log('🚀 ~ createItem ~ result:', result);
    setData(result);
    setIsLoading(false);
  };
  return (
    <main className="flex flex-col text-gray-800 w-full h-full overflow-y-auto">
      <div className="flex bg-slate-300 h-full p-4">
        {data.length === 0 ? (
          <div className="h-full flex justify-center items-center">
            <div className="animate-spin h-10 w-10 border-4 border-green-500 rounded-full border-t-transparent justify-center items-center"></div>
          </div>
        ) : (
          <QueryResultTable data={data} />
        )}
      </div>
    </main>
  );
}
