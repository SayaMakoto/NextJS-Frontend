import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4 h-screen">
      <ul className="flex flex-col space-y-4">
        <li className="p-2 rounded hover:bg-gray-700 cursor-pointer">
          <Link href="/admin/categories">Quản lý danh mục</Link>
        </li>
        <li className="p-2 rounded hover:bg-gray-700 cursor-pointer">
          <Link href="/admin/products">Quản lý sản phẩm</Link>
        </li>
        <li className="p-2 rounded hover:bg-gray-700 cursor-pointer">
          <Link href="/admin/users">Quản lý người dùng</Link>
        </li>
        <li className="p-2 rounded hover:bg-gray-700 cursor-pointer">
          <Link href="/admin/orders">Quản lý đơn hàng</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
