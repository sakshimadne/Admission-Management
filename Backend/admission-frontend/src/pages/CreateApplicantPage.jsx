import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createApplicant } from "../api/applicantApi";

const CreateApplicantPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    entryType: "",
    quotaType: "",
    marks: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      phone,
      category,
      entryType,
      quotaType,
      marks,
    } = form;

    if (
      !name ||
      !email ||
      !phone ||
      !category ||
      !entryType ||
      !quotaType ||
      marks === ""
    ) {
      toast.error("All fields are required");
      return;
    }

    if (Number(marks) < 0 || Number(marks) > 100) {
      toast.error("Marks must be between 0 and 100");
      return;
    }

    try {
      await createApplicant({
        ...form,
        marks: Number(marks),
      });

      toast.success("Applicant created successfully");
      navigate("/applicants");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create applicant"
      );
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-semibold mb-6">
        Create Applicant
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
{/* Category */}
<select
  name="category"
  value={form.category}
  onChange={handleChange}
  className="w-full px-4 py-2 border rounded-lg"
>
  <option value="">Select Category</option>
  <option value="GM">GM</option>
  <option value="SC">SC</option>
  <option value="ST">ST</option>
  <option value="OBC">OBC</option>
</select>

{/* Entry Type */}
<select
  name="entryType"
  value={form.entryType}
  onChange={handleChange}
  className="w-full px-4 py-2 border rounded-lg"
>
  <option value="">Select Entry Type</option>
  <option value="Regular">Regular</option>
  <option value="Lateral">Lateral</option>
</select>

{/* Quota Type */}
<select
  name="quotaType"
  value={form.quotaType}
  onChange={handleChange}
  className="w-full px-4 py-2 border rounded-lg"
>
  <option value="">Select Quota Type</option>
  <option value="KCET">KCET</option>
  <option value="COMEDK">COMEDK</option>
  <option value="Management">Management</option>
</select>

        <input
          name="marks"
          type="number"
          placeholder="Marks"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-lg"
        >
          Create Applicant
        </button>

      </form>
    </div>
  );
};

export default CreateApplicantPage;