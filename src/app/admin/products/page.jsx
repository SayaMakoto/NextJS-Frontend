import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📦 Danh sách sản phẩm</h2>

        <div className="relative flex items-center gap-2 overflow-visible">
          <div>
            <input type="text" name="search" placeholder="Tìm kiếm sản phẩm" />
          </div>

          <button className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">
            Tìm
          </button>

          <Link
            href="/admin/products/create"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Thêm sản phẩm
          </Link>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Tên sản phẩm</th>
            <th className="p-3">Giá</th>
            <th className="p-3">Danh mục</th>
            <th className="p-3">Trạng thái</th>
            <th className="p-3 text-center">Hành động</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>abc</td>
            <td>123</td>
            <td>a</td>
            <td>s</td>
            <td>dd</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
