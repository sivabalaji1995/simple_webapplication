import React, { useState } from "react";
import api from "../api/client";

export default function UserForm() {
  const [form, setForm] = useState({ name: "", age: "", sex: "Male", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        name: form.name.trim(),
        age: form.age === "" ? null : Number(form.age),
        sex: form.sex,
        phone: form.phone.trim(),
      };
      const res = await api.post("/api/users", payload);
      setSuccess(`Saved user #${res.data.id}`);
      setForm({ name: "", age: "", sex: "Male", phone: "" });
      window.dispatchEvent(new CustomEvent("users:refresh"));
    } catch (err) {
      const msg = err?.response?.data?.errors?.join(", ") || err.message || "Failed to save";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}

      <div>
        <label className="block text-sm text-slate-700 mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Jane Doe"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-700 mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            min="0"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="30"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-700 mb-1">Sex</label>
          <select
            name="sex"
            value={form.sex}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-slate-700 mb-1">Phone</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="9876543210"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-medium disabled:opacity-60"
      >
        {submitting ? "Saving..." : "Save User"}
      </button>
    </form>
  );
}
