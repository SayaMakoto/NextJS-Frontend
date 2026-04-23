"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOrderById, updateOrderStatus } from "@/services/orderService";

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(id);
        setOrder(data);
      } catch (err) {
        setMessage("Không tải được đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  const handleToggleStatus = async () => {
    try {
      const newStatus = order.status === 1 ? 0 : 1;

      await updateOrderStatus(order.oder_id, {
        status: newStatus,
      });

      setOrder({ ...order, status: newStatus });
      setMessage("Cập nhật trạng thái thành công!");
    } catch {
      setMessage("Cập nhật thất bại!");
    }
  };

  if (loading) return <div className="p-6">Đang tải...</div>;
  if (!order) return <div className="p-6">Không tìm thấy đơn hàng</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Quay lại
      </button>

      <h2 className="text-2xl font-bold mb-4">🧾 Đơn hàng #{order.oder_id}</h2>

      {message && (
        <div className="mb-4 text-green-600 font-medium">{message}</div>
      )}

      {/* Thông tin khách hàng */}
      <div className="mb-6 border rounded p-4 bg-gray-50">
        <h3 className="font-semibold mb-2">Thông tin khách hàng</h3>
        <p>
          <strong>Tên:</strong> {order.customer_name}
        </p>
        <p>
          <strong>Email:</strong> {order.email}
        </p>
        <p>
          <strong>SĐT:</strong> {order.phone}
        </p>
        <p>
          <strong>Địa chỉ:</strong> {order.address}
        </p>
        <p>
          <strong>Ghi chú:</strong> {order.note || "Không có"}
        </p>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Sản phẩm</h3>

        <div className="space-y-3">
          {order.order_details?.map((item) => (
            <div
              key={item.oder_detail_id}
              className="flex items-center gap-4 border rounded p-3"
            >
              <img
                src={item.product_image}
                alt={item.product_name}
                className="w-16 h-16 object-cover rounded"
              />

              <div className="flex-1">
                <p className="font-medium">{item.product_name}</p>
                <p className="text-sm text-gray-600">
                  {item.price.toLocaleString()}đ × {item.quantity}
                </p>
              </div>

              <div className="font-semibold">
                {(item.price * item.quantity).toLocaleString()}đ
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tổng tiền + Trạng thái */}
      <div className="flex justify-between items-center border-t pt-4">
        <div className="text-lg font-bold">
          Tổng tiền: {order.total?.toLocaleString()}đ
        </div>

        <button
          onClick={handleToggleStatus}
          className={`px-4 py-2 rounded text-white ${
            order.status === 1
              ? "bg-green-600 hover:bg-green-700"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          {order.status === 1
            ? "Đã xử lý (Click để chuyển về Chưa xử lý)"
            : "Chưa xử lý (Click để xác nhận)"}
        </button>
      </div>
    </div>
  );
}
