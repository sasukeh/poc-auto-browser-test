'use client';
import { FcHighPriority, FcOk } from 'react-icons/fc';

const QueryResultTable = ({ data }: { data: any }) => {
  return (
    <div className="relative overflow-x-auto">
      <h1 className="text-lg font-bold mb-4">Query Results</h1>
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Query
            </th>
            <th scope="col" className="px-6 py-3">
              Result
            </th>
            <th scope="col" className="px-6 py-3">
              Is Error
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => {
            function extractContent(input: string): string {
              // content='...' のパターンを正規表現でキャプチャ
              const match = input.match(/content='([^']*)'/);

              // マッチしていればキャプチャした文字列を返す、そうでなければ元の文字列を返す
              if (match && match[1]) {
                return match[1];
              } else {
                return input;
              }
            }
            return (
              <tr key={item.id} className="bg-white border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{item.query}</td>
                <td className="px-6 py-4">{extractContent(item.result)}</td>
                <td className="px-6 py-4">
                  {item.isError ? (
                    <FcHighPriority size={30} />
                  ) : (
                    <FcOk size="30" />
                  )}
                </td>
                <td className="px-6 py-4">{item.dueDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QueryResultTable;
