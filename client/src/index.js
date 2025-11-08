import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { privateRoute, publicRoutes } from "./Route";
import { jwtDecode } from "jwt-decode";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

// Hàm lấy cookie theo tên
function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
  return null;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public routes */}
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          {/* Private routes */}
          {privateRoute.map((route, index) => {
            const token = getCookie("token");

            if (token) {
              try {
                const decoded = jwtDecode(token);
                if (decoded.admin || decoded.employee) {
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  );
                }
              } catch (error) {
                console.error("Lỗi token:", error);
              }
            }

            // Nếu không có token hoặc không hợp lệ => quay về App (home)
            return <Route key={index} path="/" element={<App />} />;
          })}
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

// Optional: Đo hiệu suất
reportWebVitals();
