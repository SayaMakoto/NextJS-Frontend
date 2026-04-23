"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOders } from "@/services/orderService";
import AdminTable from "@/components/admin/table/AdminTable";

export default function OrderPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOders();
        setOrders(data);
      } catch (err) {
        setError("Lỗi tải danh sách đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleView = (order) => {
    router.push(`/admin/orders/${order.oder_id}`);
  };

  const columns = [
    { key: "oder_id", label: "ID" },
    { key: "customer_name", label: "Khách hàng" },
    {
      key: "status",
      label: "Trạng thái",
      render: (item) => {
        const status = Number(item.status);
        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              status === 1
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {status === 1 ? "Đã xử lý" : "Chưa xử lý"}
          </span>
        );
      },
    },
    {
      key: "action",
      label: "Hành động",
      render: (item) => (
        <button
          onClick={() => handleView(item)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition"
        >
          Xem chi tiết
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">🧾 Quản lý đơn hàng</h2>

      {error && <div className="text-red-600 mb-3">{error}</div>}

      <AdminTable
        columns={columns}
        data={orders}
        loading={loading}
        rowKey="oder_id"
      />
    </div>
  );
}
