import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./shared/components/Toast";
import LoginPage from "./pages/LoginPage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
