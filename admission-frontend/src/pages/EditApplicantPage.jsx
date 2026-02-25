import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getApplicantById } from "../api/applicantApi";
import { updateApplicant } from "../api/applicantApi";

const EditApplicantPage = () => {
  const { id } = useParams();
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

  useEffect(() => {
    fetchApplicant();
  }, []);

  const fetchApplicant = async () => {
    try {
      const data = await getApplicantById(id);
      setForm(data);
    } catch  {
      toast.error("Failed to load applicant");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateApplicant(id, {
        ...form,
        marks: Number(form.marks),
      });

      toast.success("Applicant updated successfully");
      navigate("/applicants");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update applicant"
      );
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-semibold mb-6">
        Edit Applicant
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />

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

        <select
          name="entryType"
          value={form.entryType}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="Regular">Regular</option>
          <option value="Lateral">Lateral</option>
        </select>

        <select
          name="quotaType"
          value={form.quotaType}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="KCET">KCET</option>
          <option value="COMEDK">COMEDK</option>
          <option value="Management">Management</option>
        </select>

        <input
          name="marks"
          type="number"
          value={form.marks}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-lg"
        >
          Update Applicant
        </button>

      </form>
    </div>
  );
};

export default EditApplicantPage;