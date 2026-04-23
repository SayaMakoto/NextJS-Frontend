"use client";

export default function AdminTable({
  columns = [],
  data = [],
  loading = false,
  onEdit,
  onDelete,
  rowKey = "id",
}) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200 text-left">
          {columns.map((col) => (
            <th key={col.key} className="p-3">
              {col.label}
            </th>
          ))}
          <th className="p-3 text-center">Hành động</th>
        </tr>
      </thead>

      <tbody>
        {loading ? (
          <tr>
            <td colSpan={columns.length + 1} className="text-center p-4">
              Đang tải...
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + 1} className="text-center p-4">
              Không có dữ liệu
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item[rowKey]} className="border-t">
              {columns.map((col) => (
                <td key={col.key} className="p-3">
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}

              <td className="p-3 text-center space-x-2">
                <button
                  onClick={() => onEdit && onEdit(item)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Sửa
                </button>

                <button
                  onClick={() => onDelete && onDelete(item)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
