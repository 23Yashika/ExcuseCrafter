import { useState } from "react";

const ExcuseGenerator = () => {
  const [situation, setSituation] = useState("");
  const [language, setLanguage] = useState("english");
  const [excuse, setExcuse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateExcuse = async () => {
    if (!situation) {
      setError("Please enter a situation.");
      return;
    }

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      setError("Missing Gemini API key. Make sure it's set in your .env file.");
      return;
    }

    setLoading(true);
    setError("");
    setExcuse("");

    try {
const prompt = `
Role:
You are a witty and creative assistant who specializes in generating excuses.

Task:
Given a specific situation and a target language, generate a short, natural-sounding excuse that is believable and could realistically be used in everyday life.

Situation:
- ${situation}

Language:
- ${language}

Guidelines:
- Write the excuse in the specified language and simple words.
-reply in a human nature and behaviour and give meaning ful excuse in 
- The excuse should be in 30 words.
- Do NOT include any explanations, introductions, or extra text—only provide the excuse itself.

Output:
- Only output the excuse itself.
`;





      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Try to extract the generated text safely
      const generatedText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        data?.candidates?.[0]?.content?.text ||
        "";

      if (generatedText) {
        setExcuse(generatedText);
      } else {
        setError("No excuse generated. Try again.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch excuse. Check your API key and internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <textarea
        className="w-full p-3 border border-gray-300 rounded mb-4"
        placeholder="Enter your situation..."
        value={situation}
        onChange={(e) => setSituation(e.target.value)}
      />

      <select
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="english">English</option>
        <option value="hindi">Hindi</option>
        <option value="hinglish">Hinglish</option>
      </select>

      <button
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded mb-4"
        onClick={generateExcuse}
        disabled={loading}
      >
        {loading ? "Generating..." : "Make Excuse 🎭"}
      </button>

      {excuse && (
        <div className="bg-green-100 text-green-800 p-4 rounded text-left whitespace-pre-wrap">
          <strong>Excuse:</strong> {excuse}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-800 p-3 mt-2 rounded">{error}</div>
      )}
    </div>
  );
};

export default ExcuseGenerator;
