import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Assessment() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedAssessment =
    location.state?.assessment;

  // =========================================
  // QUESTION BANK
  // =========================================

  const questionBank = {

    "Python Programming Assessment": [
      {
        question:
          "Which keyword is used to define a function in Python?",
        options: [
          "function",
          "def",
          "fun",
          "define",
        ],
        answer: "def",
      },

      {
        question:
          "Which data type stores True or False?",
        options: [
          "String",
          "Integer",
          "Boolean",
          "Float",
        ],
        answer: "Boolean",
      },

      {
        question:
          "Which symbol is used for comments in Python?",
        options: [
          "//",
          "#",
          "/*",
          "<!--",
        ],
        answer: "#",
      },

      {
        question:
          "Which function displays output in Python?",
        options: [
          "display()",
          "echo()",
          "print()",
          "output()",
        ],
        answer: "print()",
      },

      {
        question:
          "Which collection is ordered and changeable?",
        options: [
          "Tuple",
          "Set",
          "List",
          "FrozenSet",
        ],
        answer: "List",
      },
    ],

    // =======================================
    // AI
    // =======================================

    "Artificial Intelligence Basics": [
      {
        question:
          "What does AI stand for?",
        options: [
          "Automated Internet",
          "Artificial Intelligence",
          "Advanced Information",
          "Automated Intelligence",
        ],
        answer:
          "Artificial Intelligence",
      },

      {
        question:
          "Which of the following is a type of AI agent?",
        options: [
          "Simple Reflex Agent",
          "Database Agent",
          "Compiler Agent",
          "Network Agent",
        ],
        answer:
          "Simple Reflex Agent",
      },

      {
        question:
          "Which algorithm is commonly used for finding the shortest path?",
        options: [
          "A* Algorithm",
          "Bubble Sort",
          "Binary Search",
          "Merge Sort",
        ],
        answer:
          "A* Algorithm",
      },

      {
        question:
          "What is machine learning mainly concerned with?",
        options: [
          "Learning from data",
          "Designing websites",
          "Managing files",
          "Creating hardware",
        ],
        answer:
          "Learning from data",
      },

      {
        question:
          "Which search algorithm uses a heuristic function?",
        options: [
          "A* Search",
          "Linear Search",
          "Bubble Sort",
          "Depth First Search",
        ],
        answer:
          "A* Search",
      },
    ],

    // =======================================
    // WEB DEVELOPMENT
    // =======================================

    "Web Development Assessment": [
      {
        question:
          "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Text Machine Language",
          "Hyperlink Text Management Language",
          "Home Tool Markup Language",
        ],
        answer:
          "Hyper Text Markup Language",
      },

      {
        question:
          "Which language is mainly used for styling web pages?",
        options: [
          "HTML",
          "CSS",
          "Python",
          "SQL",
        ],
        answer: "CSS",
      },

      {
        question:
          "Which language is used to add interactivity to web pages?",
        options: [
          "HTML",
          "CSS",
          "JavaScript",
          "SQL",
        ],
        answer: "JavaScript",
      },

      {
        question:
          "Which HTML tag is used to create a hyperlink?",
        options: [
          "<p>",
          "<a>",
          "<link>",
          "<href>",
        ],
        answer: "<a>",
      },

      {
        question:
          "Which symbol is used to select an ID in CSS?",
        options: [
          ".",
          "#",
          "*",
          "$",
        ],
        answer: "#",
      },
    ],
  };

  // =========================================
  // QUESTIONS
  // =========================================

  const questions = selectedAssessment
    ? questionBank[
        selectedAssessment.title
      ] || []
    : [];

  // =========================================
  // STATES
  // =========================================

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState({});

  const [timeLeft, setTimeLeft] =
    useState(
      selectedAssessment
        ? selectedAssessment.duration * 60
        : 0
    );

  const [submitted, setSubmitted] =
    useState(false);

  const [score, setScore] =
    useState(0);

  // =========================================
  // TIMER
  // =========================================

  useEffect(() => {

    if (
      !selectedAssessment ||
      submitted
    ) {
      return;
    }

    if (timeLeft <= 0) {
      calculateResult();
      return;
    }

    const timer = setInterval(() => {

      setTimeLeft(
        (time) => time - 1
      );

    }, 1000);

    return () => clearInterval(timer);

  }, [
    timeLeft,
    submitted,
    selectedAssessment,
  ]);

  // =========================================
  // FORMAT TIME
  // =========================================

  const formatTime = (seconds) => {

    const minutes =
      Math.floor(seconds / 60);

    const remainingSeconds =
      seconds % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  // =========================================
  // SELECT ANSWER
  // =========================================

  const selectAnswer = (option) => {

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: option,
    }));

  };

  // =========================================
  // CALCULATE RESULT
  // =========================================

  const calculateResult = () => {

    let total = 0;

    questions.forEach(
      (question, index) => {

        if (
          answers[index] ===
          question.answer
        ) {
          total++;
        }

      }
    );

    const percentage =
      Math.round(
        (total / questions.length) *
          100
      );

    // =====================================
    // SAVE HISTORY
    // =====================================

    const result = {

      id: Date.now(),

      title:
        selectedAssessment.title,

      category:
        selectedAssessment.category,

      score: total,

      total:
        questions.length,

      percentage,

      date:
        new Date().toLocaleString(),
    };

    const oldHistory =
      JSON.parse(
        localStorage.getItem(
          "assessmentHistory"
        ) || "[]"
      );

    localStorage.setItem(
      "assessmentHistory",
      JSON.stringify([
        result,
        ...oldHistory,
      ])
    );

    setScore(total);

    setSubmitted(true);
  };

  // =========================================
  // MANUAL SUBMIT
  // =========================================

  const handleSubmit = () => {

    const confirmed =
      window.confirm(
        "Are you sure you want to submit the assessment?"
      );

    if (confirmed) {
      calculateResult();
    }
  };

  // =========================================
  // NO ASSESSMENT
  // =========================================

  if (!selectedAssessment) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">

        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">

          <div className="text-5xl">
            ⚠️
          </div>

          <h1 className="mt-5 text-2xl font-bold">
            Assessment Not Selected
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Please select an assessment from
            the student dashboard.
          </p>

          <button
            onClick={() =>
              navigate(
                "/student-dashboard"
              )
            }
            className="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>

        </div>

      </div>
    );
  }

  // =========================================
  // QUESTIONS NOT AVAILABLE
  // =========================================

  if (questions.length === 0) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">

        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">

          <div className="text-5xl">
            📚
          </div>

          <h1 className="mt-5 text-2xl font-bold">
            Questions Not Available
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Questions for this assessment
            have not been added yet.
          </p>

          <button
            onClick={() =>
              navigate(
                "/student-dashboard"
              )
            }
            className="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
          >
            Back to Dashboard
          </button>

        </div>

      </div>
    );
  }

  // =========================================
  // RESULT
  // =========================================

  if (submitted) {

    const percentage =
      Math.round(
        (score / questions.length) *
          100
      );

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">

        <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-xl">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
            🎉
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            Assessment Completed!
          </h1>

          <p className="mt-2 text-slate-500">
            {selectedAssessment.title}
          </p>

          <div className="my-8 rounded-2xl bg-slate-50 p-6">

            <p className="text-sm text-slate-500">
              Your Score
            </p>

            <p className="mt-2 text-5xl font-bold text-indigo-600">
              {percentage}%
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {score} /{" "}
              {questions.length}{" "}
              correct
            </p>

          </div>

          <div className="grid gap-3 sm:grid-cols-2">

            <button
              onClick={() =>
                navigate(
                  "/student-dashboard"
                )
              }
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Dashboard
            </button>

            <button
              onClick={() =>
                navigate("/history")
              }
              className="rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50"
            >
              View History
            </button>

          </div>

          <button
            onClick={() =>
              navigate("/results")
            }
            className="mt-3 w-full rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 font-semibold text-indigo-700 hover:bg-indigo-100"
          >
            View Results 📊
          </button>

        </div>

      </div>
    );
  }

  // =========================================
  // CURRENT QUESTION
  // =========================================

  const question =
    questions[currentQuestion];

  const isLastQuestion =
    currentQuestion ===
    questions.length - 1;

  // =========================================
  // MAIN ASSESSMENT UI
  // =========================================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="border-b bg-white">

        <div className="flex h-16 items-center justify-between px-4 sm:px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
              UA
            </div>

            <div>

              <h1 className="max-w-[220px] truncate font-bold sm:max-w-none">
                {selectedAssessment.title}
              </h1>

              <p className="text-xs text-slate-500">
                Question{" "}
                {currentQuestion + 1}{" "}
                of{" "}
                {questions.length}
              </p>

            </div>

          </div>

          {/* TIMER */}

          <div
            className={`rounded-xl px-4 py-2 font-bold ${
              timeLeft <= 60
                ? "animate-pulse bg-red-100 text-red-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            ⏱️{" "}
            {formatTime(timeLeft)}
          </div>

        </div>

      </header>

      {/* =====================================
          MAIN
      ===================================== */}

      <main className="mx-auto max-w-6xl p-4 sm:p-6">

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">

          {/* =================================
              QUESTION CARD
          ================================= */}

          <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">

            {/* CATEGORY */}

            <div className="mb-6">

              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                {selectedAssessment.category}
              </span>

              <h2 className="mt-5 text-xl font-bold leading-8">
                {question.question}
              </h2>

            </div>

            {/* OPTIONS */}

            <div className="space-y-3">

              {question.options.map(
                (option, index) => {

                  const selected =
                    answers[
                      currentQuestion
                    ] === option;

                  return (
                    <button
                      key={option}
                      onClick={() =>
                        selectAnswer(option)
                      }
                      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                        selected
                          ? "border-indigo-600 bg-indigo-50"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold ${
                          selected
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {String.fromCharCode(
                          65 + index
                        )}
                      </span>

                      <span className="font-medium">
                        {option}
                      </span>

                    </button>
                  );
                }
              )}

            </div>

            {/* NAVIGATION */}

            <div className="mt-8 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-between">

              <button
                disabled={
                  currentQuestion === 0
                }
                onClick={() =>
                  setCurrentQuestion(
                    currentQuestion - 1
                  )
                }
                className="rounded-xl border px-5 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Previous
              </button>

              {isLastQuestion ? (

                <button
                  onClick={handleSubmit}
                  className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                >
                  Submit Assessment ✓
                </button>

              ) : (

                <button
                  onClick={() =>
                    setCurrentQuestion(
                      currentQuestion + 1
                    )
                  }
                  className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                  Next →
                </button>

              )}

            </div>

          </section>

          {/* =================================
              QUESTION NAVIGATION
          ================================= */}

          <aside className="h-fit rounded-3xl bg-white p-5 shadow-sm">

            <h3 className="font-bold">
              Questions
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Navigate between questions
            </p>

            {/* QUESTION NUMBERS */}

            <div className="mt-5 grid grid-cols-5 gap-2">

              {questions.map(
                (_, index) => {

                  const answered =
                    answers[index] !==
                    undefined;

                  return (
                    <button
                      key={index}
                      onClick={() =>
                        setCurrentQuestion(
                          index
                        )
                      }
                      className={`h-10 rounded-lg font-semibold transition ${
                        currentQuestion ===
                        index
                          ? "bg-indigo-600 text-white"
                          : answered
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  );

                }
              )}

            </div>

            {/* LEGEND */}

            <div className="mt-6 space-y-2 text-xs">

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-indigo-600" />
                Current
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-green-200" />
                Answered
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-slate-200" />
                Not Answered
              </div>

            </div>

            {/* WARNING */}

            <div className="mt-6 rounded-xl bg-amber-50 p-4 text-xs leading-5 text-amber-700">
              ⚠️ Review your answers before
              submitting the assessment.
            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}

export default Assessment;