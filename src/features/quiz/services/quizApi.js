import api from "../../../shared/services/api";

export async function fetchCategories() {
  try {
    const { data } = await api.get("/api_category.php");
    return data.trivia_categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function fetchQuestions(options = {}) {
  const { amount = 10, category = "", difficulty = "", type = "" } = options;

  try {
    const params = { amount, encode: "url3986" };
    if (category) params.category = category;
    if (difficulty) params.difficulty = difficulty;
    if (type) params.type = type;

    const { data } = await api.get("/api.php", { params });

    if (data.response_code === 0) {
      return {
        success: true,
        questions: data.results.map((q) => ({
          category: decodeURIComponent(q.category),
          type: q.type,
          difficulty: q.difficulty,
          question: decodeURIComponent(q.question),
          correctAnswer: decodeURIComponent(q.correct_answer),
          incorrectAnswers: q.incorrect_answers.map((a) =>
            decodeURIComponent(a)
          ),
          allAnswers: shuffleAnswers([
            decodeURIComponent(q.correct_answer),
            ...q.incorrect_answers.map((a) => decodeURIComponent(a)),
          ]),
        })),
      };
    }

    const errorMessages = {
      1: "Tidak cukup soal untuk kategori ini. Coba kurangi jumlah soal atau pilih kategori lain.",
      2: "Parameter tidak valid.",
      3: "Token tidak ditemukan.",
      4: "Semua soal sudah ditampilkan. Coba reset atau pilih kategori lain.",
      5: "Terlalu banyak request. Tunggu beberapa detik.",
    };

    return {
      success: false,
      error: errorMessages[data.response_code] || "Terjadi kesalahan.",
    };
  } catch (error) {
    console.error("Error fetching questions:", error);
    return {
      success: false,
      error: "Gagal menghubungi server. Periksa koneksi internet.",
    };
  }
}

function shuffleAnswers(answers) {
  const shuffled = [...answers];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
