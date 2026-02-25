import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import toast from "react-hot-toast";
import { Eye, EyeOff, UserPlus } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admission Officer",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await registerUser(formData);

      toast.success("User registered successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">


      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">College CRM</h1>
          <p className="text-lg opacity-90">
            Admission Management System
          </p>
          <p className="mt-4 text-sm opacity-75">
            Manage institutions, applicants, seat allocation and confirmations efficiently.
          </p>
        </div>
      </div>


      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-[420px]">

          <div className="flex items-center gap-2 mb-6">
            <UserPlus className="text-indigo-600" />
            <h2 className="text-2xl font-semibold">Create Account</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

   
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="Admin">Admin</option>
              <option value="Admission Officer">Admission Officer</option>
              <option value="Management">Management</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

          </form>

          <p className="text-sm text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;