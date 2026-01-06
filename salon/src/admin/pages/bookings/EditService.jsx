import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ServiceForm from "./ServiceForm";
import { toast } from "react-toastify";

export default function EditService() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/admin/services/${id}`)
      .then((res) => res.json())
      .then((res) => setData(res.data));
  }, [id]);

  const submit = async (formData) => {
    const res = await fetch(`http://127.0.0.1:8000/api/admin/services/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    const d = await res.json();
    console.log("d", d);
    debugger;
    res.ok ? toast.success("Updated") : toast.error(d.message);
  };

  return <ServiceForm initialData={data} onSubmit={submit} />;
}
