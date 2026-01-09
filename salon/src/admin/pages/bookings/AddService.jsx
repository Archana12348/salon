import ServiceForm from "./ServiceForm";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddService() {
  const navigate = useNavigate();

  const submit = async (formData) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/admin/services", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ SUCCESS ALERT
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: data.message || "Service created successfully",
          confirmButtonText: "OK",
        });

        // ✅ REDIRECT AFTER SUCCESS
        navigate("/admin/services");
      } else {
        // ❌ ERROR ALERT
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: data.message || "Something went wrong",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Unable to create service. Please try again.",
      });
    }
  };

  return <ServiceForm onSubmit={submit} />;
}
