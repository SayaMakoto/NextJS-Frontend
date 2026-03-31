"use client";
import React, { useEffect, useState } from "react";

import Select from "@/components/common/Select";
import { isEmpty } from "@/utils/validators";
import { getBrands } from "@/services/brandService";

export default function BrandSelect({ name, value, onChange }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  // goi api
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getBrands({ trash: 0 });
        setBrands(data);
      } catch (e) {
        setErrors(e.data.error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(brands);
  return (
    <div>
      {!isEmpty(errors) ? (
        <p> {errors.message}</p>
      ) : loading ? (
        "loading brands"
      ) : (
        <Select
          options={brands}
          valueKey="brand_id"
          labelKey="brand_name"
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}
