import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Modal from "../components/Modal";
import Login from "../Login";
import Register from "../Register";

export default function DashboardLayout({ children }) {
  const [visLogin, setVisLogin] = useState(false);
  const [visRegister, setVisRegister] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        onLoginClick={() => setVisLogin(true)}
        onRegisterClick={() => setVisRegister(true)}
      />
      <main className="flex-1 bg-[#f4f7fe] p-8">
        {children}
        <Modal open={visLogin} onClose={() => setVisLogin(false)} title="Logg inn">
          <Login />
        </Modal>
        <Modal open={visRegister} onClose={() => setVisRegister(false)} title="Registrer">
          <Register />
        </Modal>
      </main>
    </div>
  );
}
