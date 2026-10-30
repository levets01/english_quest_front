import "../ui.css";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="auth-layout">
      <main className="auth-layout-main">
        <Outlet />
      </main>
    </div>
  );
}
