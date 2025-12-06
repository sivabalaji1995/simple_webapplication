import React, { useEffect, useState } from "react";
import api from "../api/client";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const res = await api.get("/api/users");
      setUsers(res.data);
    } catch (err) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const handler = () => load();
    window.addEventListener("users:refresh", handler);
    return () => window.removeEventListener("users:refresh", handler);
  }, []);

  if (loading) return <div className="text-slate-500 text-sm">Loading...</div>;
  if (error) return <div className="text-red-600 text-sm">{error}</div>;

  if (users.length === 0) {
    return <div className="text-slate-500 text-sm">No users yet. Add one!</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 border-b">
            <th className="py-2 pr-2">Name</th>
            <th className="py-2 pr-2">Age</th>
            <th className="py-2 pr-2">Sex</th>
            <th className="py-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b last:border-0">
              <td className="py-2 pr-2 font-medium text-slate-800">{u.name}</td>
              <td className="py-2 pr-2">{u.age ?? "-"}</td>
              <td className="py-2 pr-2">{u.sex}</td>
              <td className="py-2">{u.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
