import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ServiceForm from "./ServiceForm";
import Swal from "sweetalert2";

export default function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(
      `https://jumeirah.premierwebtechservices.com/backend/api/admin/services/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => setData(res.data));
  }, [id]);

  const submit = async (formData) => {
    try {
      const res = await fetch(
        `https://jumeirah.premierwebtechservices.com/backend/api/admin/services/${id}`,
        {
          method: "POST", // keep POST if backend expects it
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      const d = await res.json();

      if (res.ok) {
        // ✅ SUCCESS ALERT
        await Swal.fire({
          icon: "success",
          title: "Updated!",
          text: d.message || "Service updated successfully",
          confirmButtonText: "OK",
        });

        // ✅ REDIRECT AFTER SUCCESS
        navigate("/admin/services");
      } else {
        // ❌ ERROR ALERT
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: d.message || "Something went wrong",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Unable to update service",
      });
    }
  };

  return <ServiceForm initialData={data} onSubmit={submit} />;
}
