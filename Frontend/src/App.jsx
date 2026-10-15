import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Loader from "./components/Loader";

function App() {
  const [question, setQuestion] = useState("");
  const [data, setData] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoader(true);
    setData("");

    axios
      .post("/api/app", { question })
      .then((res) => {
        setData(res.data.answer);
      })
      .catch((err) => {
        console.log(err);
        setData("Something went wrong. Please try again.");
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white font-sans antialiased">
      {/* Header Bar */}
      <header className="w-full border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Gemini AI Studio
            </h1>
            <p className="text-xs text-slate-400">
              Advanced Content Generation
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
            Model Active
          </span>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          {/* Left Column: Input Form */}
          <section className="lg:col-span-5 flex flex-col">
            <form
              onSubmit={handleSubmit}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col h-full justify-between backdrop-blur-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="prompt"
                    className="text-sm font-semibold text-slate-300 tracking-wide"
                  >
                    Your Prompt
                  </label>
                  <span className="text-xs text-slate-500 font-mono">
                    Markdown supported
                  </span>
                </div>

                <textarea
                  id="prompt"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-4 h-52 sm:h-64 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 resize-none transition-all shadow-inner"
                  placeholder="Ask Gemini anything... (e.g., Explain quantum computing like I'm 5)"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loader || !question.trim()}
                className="mt-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium px-5 py-3.5 w-full rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.99] flex items-center justify-center space-x-2"
              >
                <span>
                  {loader ? "Generating Response..." : "Generate Content"}
                </span>
                {!loader && (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                )}
              </button>
            </form>
          </section>

          {/* Right Column: AI Output */}
          <section className="lg:col-span-7 flex flex-col">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col h-full backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
                <span className="text-sm font-semibold text-slate-300 tracking-wide">
                  Response Output
                </span>
                {data && !loader && (
                  <button
                    onClick={() => navigator.clipboard.writeText(data)}
                    className="text-xs text-slate-400 hover:text-indigo-400 transition-colors flex items-center space-x-1 bg-slate-800/60 hover:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700/50"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Copy</span>
                  </button>
                )}
              </div>

              <div className="flex-1 min-h-[350px] max-h-[500px] overflow-y-auto pr-2 custom-scrollbar text-left text-slate-300 text-sm leading-relaxed">
                {loader ? (
                  <Loader />
                ) : data ? (
                  <div className="prose prose-invert prose-slate max-w-none">
                    <ReactMarkdown>{data}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-600">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 text-slate-500 shadow-inner">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-slate-400">
                      Ready when you are
                    </p>
                    <p className="text-xs text-slate-600 mt-1 max-w-xs">
                      Type a prompt on the left and click generate to let Gemini
                      build your content.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-900 py-4 text-center text-xs text-slate-600">
        Powered by Gemini AI • Built with React & Tailwind CSS
      </footer>
    </div>
  );
}

export default App;
