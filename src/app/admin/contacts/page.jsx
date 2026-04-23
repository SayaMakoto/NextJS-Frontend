"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getContacts, delContact } from "@/services/contactService";
import AdminTable from "@/components/admin/table/AdminTable";
import Pagination from "@/components/common/Pagination";

export default function ContactPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});

  const [totalPages, setTotalPages] = useState(1);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);

        const res = await getContacts({ trash: 0 });

        setContacts(res);
        setTotalPages(1);
      } catch (err) {
        console.error("Lỗi load liên hệ:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [params]);

  const handleEdit = (contact) => {
    router.push(`/admin/contacts/${contact.contact_id}`);
  };

  const handleDelete = async (contact) => {
    const confirmDelete = window.confirm(`Xóa liên hệ từ "${contact.email}"?`);
    if (!confirmDelete) return;

    try {
      setLoading(true);
      setSuccess("");
      setErrors({});

      await delContact(contact.contact_id);

      setContacts((prev) =>
        prev.filter((item) => item.contact_id !== contact.contact_id),
      );

      setSuccess("Đã xóa liên hệ thành công!");
    } catch (error) {
      setErrors({ message: "Xóa thất bại!" });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: "contact_id", label: "ID" },
    { key: "email", label: "Email" },
    { key: "title", label: "Tiêu đề" },
    {
      key: "content",
      label: "Nội dung",
      render: (item) =>
        item.content?.length > 50
          ? item.content.slice(0, 50) + "..."
          : item.content,
    },
    {
      key: "status",
      label: "Trạng thái",
      render: (item) => (item.status === 1 ? "Đã xử lý" : "Chưa xử lý"),
    },
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📬 Danh sách liên hệ</h2>
      </div>

      {success && <div className="mb-3 text-green-600">{success}</div>}
      {errors.message && (
        <div className="mb-3 text-red-600">{errors.message}</div>
      )}

      <AdminTable
        columns={columns}
        data={contacts}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        rowKey="contact_id"
      />

      <Pagination
        totalPages={totalPages}
        params={params}
        onChangeParams={setParams}
      />
    </div>
  );
}
