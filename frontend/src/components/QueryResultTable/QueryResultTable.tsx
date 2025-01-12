'use client';

const QueryResultTable = ({ data }: { data: any }) => {
  return (
    <div className="relative overflow-x-auto">
      <h1 className="text-lg font-bold mb-4">Query Results</h1>
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
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
              Due Date
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id} className="bg-white border-b ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {item.id}
              </th>
              <td className="px-6 py-4">{item.query}</td>
              <td className="px-6 py-4">{item.result}</td>
              <td className="px-6 py-4">{item.isError ? 'Yes' : 'No'}</td>
              <td className="px-6 py-4">{item.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueryResultTable;
