// import { useState } from "react";

// const ExcuseGenerator = () => {
//   const [situation, setSituation] = useState("");
//   const [language, setLanguage] = useState("english");
//   const [excuse, setExcuse] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const generateExcuse = async () => {
//     if (!situation) {
//       setError("Please enter a situation.");
//       return;
//     }

//     const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

//     if (!apiKey) {
//       setError("Missing Gemini API key. Make sure it's set in your .env file.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setExcuse("");

//     try {
// const prompt = `
// Role:
// You are a witty and creative assistant who specializes in generating excuses.

// Task:
// Given a specific situation and a target language, generate a short, natural-sounding excuse that is believable and could realistically be used in everyday life.

// Situation:
// - ${situation}

// Language:
// - ${language}

// Guidelines:
// - Write the excuse in the specified language and simple words.
// -reply in a human nature and behaviour and give meaning ful excuse in 
// - The excuse should be in 30 words.
// - Do NOT include any explanations, introductions, or extra text—only provide the excuse itself.

// Output:
// - Only output the excuse itself.
// `;





//       const response = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             contents: [{ parts: [{ text: prompt }] }],
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("API Response:", data);

//       // Try to extract the generated text safely
//       const generatedText =
//         data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//         data?.candidates?.[0]?.content?.text ||
//         "";

//       if (generatedText) {
//         setExcuse(generatedText);
//       } else {
//         setError("No excuse generated. Try again.");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Failed to fetch excuse. Check your API key and internet.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg">
//       <textarea
//         className="w-full p-3 border border-gray-300 rounded mb-4"
//         placeholder="Enter your situation..."
//         value={situation}
//         onChange={(e) => setSituation(e.target.value)}
//       />

//       <select
//         className="w-full p-2 border border-gray-300 rounded mb-4"
//         value={language}
//         onChange={(e) => setLanguage(e.target.value)}
//       >
//         <option value="english">English</option>
//         <option value="hindi">Hindi</option>
//         <option value="hinglish">Hinglish</option>
//       </select>

//       <button
//         className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded mb-4"
//         onClick={generateExcuse}
//         disabled={loading}
//       >
//         {loading ? "Generating..." : "Make Excuse 🎭"}
//       </button>

//       {excuse && (
//         <div className="bg-green-100 text-green-800 p-4 rounded text-left whitespace-pre-wrap">
//           <strong>Excuse:</strong> {excuse}
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-100 text-red-800 p-3 mt-2 rounded">{error}</div>
//       )}
//     </div>
//   );
// };

// export default ExcuseGenerator;




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
- reply in a human nature and behaviour and give meaning ful excuse in 
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
      setError("Failed to fetch excuse. Check your API key and internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-[90vw] max-w-5xl mx-auto bg-neutral-50 border border-stone-300 rounded-3xl shadow-xl p-12">
        <h2 className="text-5xl font-extrabold text-stone-800 text-center mb-10 tracking-wide">
          🎭 Excuse Generator
        </h2>
        <textarea
          className="w-full min-h-[120px] p-6 border-2 border-stone-300 focus:border-stone-500 rounded-2xl text-2xl font-semibold mb-8 transition duration-200 outline-none shadow-sm bg-white text-stone-900 placeholder:text-stone-400"
          placeholder="Describe your situation..."
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
        />
        <div className="flex gap-6 mb-8">
          <select
            className="flex-1 p-4 border-2 border-stone-300 rounded-2xl bg-white text-stone-700 font-bold text-xl focus:border-stone-500 transition"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="hinglish">Hinglish</option>
          </select>
          <button
            className={`flex-1 bg-stone-700 hover:bg-stone-800 text-white text-2xl font-extrabold py-4 rounded-2xl shadow-md transition duration-200 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            onClick={generateExcuse}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg
                  className="animate-spin h-7 w-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Generating...
              </span>
            ) : (
              "Make Excuse 🎭"
            )}
          </button>
        </div>
        {excuse && (
          <div className="bg-stone-50 border-l-8 border-stone-600 text-stone-900 p-8 rounded-2xl mb-4 shadow-inner animate-fade-in text-2xl font-bold">
            <span className="block mb-3 text-stone-700 text-3xl font-extrabold">
              Excuse:
            </span>
            <span className="whitespace-pre-wrap">{excuse}</span>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border-l-8 border-red-500 text-red-800 p-6 rounded-2xl mt-2 shadow-inner animate-shake text-xl font-bold">
            {error}
          </div>
        )}
        <style>
          {`
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(20px);}
              to { opacity: 1; transform: translateY(0);}
            }
            .animate-fade-in { animation: fade-in 0.6s cubic-bezier(.4,0,.2,1) both; }
            @keyframes shake {
              10%, 90% { transform: translateX(-1px);}
              20%, 80% { transform: translateX(2px);}
              30%, 50%, 70% { transform: translateX(-4px);}
              40%, 60% { transform: translateX(4px);}
            }
            .animate-shake { animation: shake 0.5s; }
          `}
        </style>
      </div>
    </div>
  );
};

export default ExcuseGenerator;
