import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useResults() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const savedResult = localStorage.getItem("quisip_quiz_result");
    if (!savedResult) {
      navigate("/setup");
      return;
    }
    setResult(JSON.parse(savedResult));
  }, [navigate]);

  const handlePlayAgain = () => {
    localStorage.removeItem("quisip_quiz_data");
    localStorage.removeItem("quisip_quiz_progress");
    localStorage.removeItem("quisip_quiz_result");
    navigate("/setup");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return {
    result,
    handlePlayAgain,
    handleLogout,
  };
}
