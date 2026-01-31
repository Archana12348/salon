// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const UserProfile = () => {
//   const { slug } = useParams(); // slug from URL
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const userAuth = localStorage.getItem("user_auth");

//     if (!userAuth) {
//       alert("User not logged in");
//       setLoading(false);
//       return;
//     }

//     const { token } = JSON.parse(userAuth);

//     fetch(
//       `https://jumeirah.premierwebtechservices.com/backend/api/site/user/${slug}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     )
//       .then((res) => res.json())
//       .then((res) => {
//         setUser(res.data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [slug]);

//   /* ---------- Loader ---------- */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <span className="text-gray-500 text-lg">Loading profile...</span>
//       </div>
//     );
//   }

//   /* ---------- Safety Guard ---------- */
//   if (!user) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <span className="text-red-500 text-lg">User not found</span>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br p-4 flex justify-center mt-12">
//       <div className="w-full max-w-5xl bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
//         {/* ---------- Profile Header ---------- */}
//         <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-green-100 shadow-inner">
//           <div className="relative">
//             {user.avatar ? (
//               <img
//                 src={`https://jumeirah.premierwebtechservices.com/backend/${user.avatar}`}
//                 alt="profile"
//                 className="w-36 h-36 rounded-full object-cover border-4 border-green-900 shadow-xl"
//               />
//             ) : (
//               <div className="w-36 h-36 rounded-full flex items-center justify-center bg-green-900 text-white text-4xl font-bold shadow-xl">
//                 {user.name?.charAt(0)}
//               </div>
//             )}

//             <span className="absolute bottom-1 right-1 px-3 py-1 rounded-xl bg-[#FF9C00] text-white text-xs shadow-md cursor-pointer">
//               Edit
//             </span>
//           </div>

//           <div className="flex-1">
//             <h2 className="text-3xl font-bold text-black">{user.name}</h2>
//             <p className="text-gray-600">{user.email}</p>

//             <div className="mt-4">
//               <span className="px-4 py-2 rounded-full bg-green-900 text-white shadow">
//                 Active
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* ---------- Form Section ---------- */}
//         <h3 className="text-xl font-semibold text-black mt-10 mb-4">
//           Personal Information
//         </h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-green-100 rounded-2xl shadow-md">
//           <div>
//             <label className="text-gray-700 text-sm">Full Name</label>
//             <input
//               type="text"
//               defaultValue={user.name}
//               className="w-full mt-1 p-3 bg-white/40 border rounded-xl shadow"
//             />
//           </div>

//           <div>
//             <label className="text-gray-700 text-sm">Email Address</label>
//             <input
//               type="email"
//               defaultValue={user.email}
//               className="w-full mt-1 p-3 bg-white/40 border rounded-xl shadow"
//             />
//           </div>

//           <div>
//             <label className="text-gray-700 text-sm">Phone Number</label>
//             <input
//               type="text"
//               defaultValue={user.phone}
//               className="w-full mt-1 p-3 bg-white/40 border rounded-xl shadow"
//             />
//           </div>

//           <div>
//             <label className="text-gray-700 text-sm">Gender</label>
//             <select
//               defaultValue={user.gender}
//               className="w-full mt-1 p-3 bg-white/40 border rounded-xl shadow"
//             >
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//         </div>

//         {/* ---------- Buttons ---------- */}
//         <div className="mt-8 flex justify-end gap-4">
//           <button className="px-6 py-2 rounded-xl bg-gray-300 shadow hover:scale-105 transition">
//             Cancel
//           </button>
//           <button className="px-6 py-2 rounded-xl bg-[#FF9C00] text-white shadow-lg hover:bg-white hover:text-green-900 hover:scale-105 transition">
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { slug } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  // form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  /* ---------- Fetch Profile ---------- */
  useEffect(() => {
    const userAuth = localStorage.getItem("user_auth");
    if (!userAuth) {
      alert("User not logged in");
      setLoading(false);
      return;
    }

    const { token } = JSON.parse(userAuth);

    fetch(
      `https://jumeirah.premierwebtechservices.com/backend/api/site/user/${slug}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((res) => res.json())
      .then((res) => {
        setUser(res.data);
        console.log(res.data);

        setFormData({
          name: res.data?.name || "",
          email: res.data?.email || "",
          phone: res.data?.phone || "",
          gender: res.data?.gender || "",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  /* ---------- Input Change ---------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ---------- Update Profile ---------- */
  // const handleSubmit = async () => {
  //   const userAuth = localStorage.getItem("user_auth");
  //   if (!userAuth) return alert("User not logged in");

  //   const { token } = JSON.parse(userAuth);
  //   setSaving(true);

  //   try {
  //     const res = await fetch(
  //       `https://jumeirah.premierwebtechservices.com/backend/api/site/user/${slug}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(formData),
  //       },
  //     );

  //     const data = await res.json();
  //     console.log("dataa", data);
  //     debugger;
  //     if (data.success) {
  //       alert("Profile updated successfully ✅");
  //       setUser((prev) => ({ ...prev, ...formData }));
  //     } else {
  //       alert(data.message || "Update failed");
  //     }
  //   } catch (error) {
  //     alert("Something went wrong");
  //   } finally {
  //     setSaving(false);
  //   }
  // };
  const handleSubmit = async () => {
    const userAuth = localStorage.getItem("user_auth");
    if (!userAuth) {
      toast.error("User not logged in");
      return;
    }

    const { token } = JSON.parse(userAuth);
    setSaving(true);

    const form = new FormData();
    form.append("_method", "PUT");
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("gender", formData.gender);

    if (avatar) {
      form.append("avatar", avatar);
    }

    try {
      const res = await fetch(
        `https://jumeirah.premierwebtechservices.com/backend/api/site/user/${slug}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        },
      );

      const data = await res.json();
      console.log("Update response 👉", data);

      if (data.success) {
        // 🎉 SweetAlert success
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Your profile has been updated successfully",
          timer: 2000,
          showConfirmButton: false,
        });

        // 🔔 Toast success
        toast.success("Profile updated successfully");

        setUser(data.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Update failed",
          text: data.message || "Something went wrong",
        });
      }
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Please try again later",
      });

      toast.error("Server error");
    } finally {
      setSaving(false);
    }
  };

  /* ---------- Loader ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="text-gray-500 text-lg">Loading profile...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="text-red-500 text-lg">User not found</span>
      </div>
    );
  }
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-4 flex justify-center mt-12">
      <div className="w-full max-w-5xl bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
        {/* ---------- Profile Header ---------- */}
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-[#51dfe1] shadow-inner">
          <div className="relative">
            <label htmlFor="avatarUpload" className="cursor-pointer">
              {preview ? (
                <img
                  src={preview}
                  alt="profile"
                  className="w-36 h-36 rounded-full object-cover border-4 border-green-900 shadow-xl"
                />
              ) : user.avatar ? (
                <img
                  src={`https://jumeirah.premierwebtechservices.com/backend/storage/${user.avatar}`}
                  alt="profile"
                  className="w-36 h-36 rounded-full object-cover border-4 border-green-900 shadow-xl"
                />
              ) : (
                <div className="w-36 h-36 rounded-full flex items-center justify-center bg-green-900 text-white text-4xl font-bold shadow-xl">
                  {user.name?.charAt(0)}
                </div>
              )}
            </label>

            {/* hidden file input */}
            <input
              type="file"
              id="avatarUpload"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />

            <span className="absolute bottom-1 right-1 px-3 py-1 rounded-xl bg-[#FF9C00] text-white text-xs shadow-md">
              Edit
            </span>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-black">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>

            {/* <div className="mt-4">
              <span className="px-4 py-2 rounded-full bg-green-900 text-white shadow">
                Active
              </span>
            </div> */}
          </div>
        </div>

        {/* ---------- Form ---------- */}
        <h3 className="text-xl font-semibold text-black mt-10 mb-4">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-[#51dfe1] rounded-2xl shadow-md">
          <div>
            <label className="text-gray-700 text-sm">Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 bg-white/40 border rounded-xl shadow"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm">Email Address</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 bg-white/40 border rounded-xl shadow"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm">Phone Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 p-3 bg-white/40 border rounded-xl shadow"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full mt-1 p-3 bg-white/40 border rounded-xl shadow"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* ---------- Buttons ---------- */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            className="px-6 py-2 rounded-xl bg-gray-300 shadow"
            onClick={() => window.location.reload()}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-6 py-2 bg-[#00CED1] text-black  rounded-full hover:bg-gradient-to-r from-[#00CED1] to-black hover:text-white transition"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
