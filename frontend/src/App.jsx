import React from "react";
import UserForm from "./components/UserForm.jsx";
import UserList from "./components/UserList.jsx";

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-800">
          User Details Portal
        </h1>
        <p className="text-center text-slate-500 mt-2">
          Add users and view submissions
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 pb-16">
        <section className="bg-white/80 backdrop-blur shadow rounded-xl p-6 border border-slate-100">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Add User</h2>
          <UserForm />
        </section>
        <section className="bg-white/80 backdrop-blur shadow rounded-xl p-6 border border-slate-100">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Users</h2>
          <UserList />
        </section>
      </main>

      <footer className="text-center text-xs text-slate-400 pb-6">Built with React + Flask</footer>
    </div>
  );
}
