import Link from "next/link";

const ProductCard = ({ product }) => {
  const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL;
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white">
      {/* Image */}
      <img
        src={`${IMG_URL}${product.image}`}
        alt={product.product_name}
        className="w-full h-40 object-cover rounded"
      />

      {/* Info */}
      <h3 className="mt-3 font-semibold text-lg line-clamp-1">
        {product.product_name}
      </h3>

      {/* Summary */}
      <p className="text-gray-500 text-sm mt-1 line-clamp-2">
        {product.summary}
      </p>

      {/* Price */}
      <p className="text-green-600 font-bold mt-2">
        {Number(product.price).toLocaleString()} đ
      </p>

      {/* Button */}
      <Link
        href={`/products/${product.product_id}`}
        className="block mt-3 bg-green-600 text-white text-center py-1 rounded hover:bg-green-700 transition"
      >
        Xem chi tiết
      </Link>
    </div>
  );
};

export default ProductCard;
