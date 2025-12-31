import ServiceForm from "./ServiceForm";
import { toast } from "react-toastify";

export default function AddService() {
  const submit = async (formData) => {
    const res = await fetch("http://127.0.0.1:8000/api/admin/services", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    const data = await res.json();
    console.log("data", data);
    debugger;
    res.ok ? toast.success("Service created") : toast.error(data.message);
  };

  return <ServiceForm onSubmit={submit} />;
}
