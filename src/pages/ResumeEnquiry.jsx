import axios from "axios";
import { useState } from "react";

const ResumeEnquiry = () => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState({});   
  const [error, setError] = useState("");

  const sections = [
    { label: "Profile Message", name: "profileMessage" },
    { label: "Contact Details", name: "contactDetails" },
    { label: "Education", name: "education" },
    { label: "Skills", name: "skills" },
    { label: "Achievements", name: "achievements" },
    { label: "Experience", name: "experience" },
    { label: "Projects", name: "projects" },
    { label: "Others", name: "others" },
  ];

  const formQuestion = async (e, section) => {
    e.preventDefault();
    const inputData = e.target[section.name].value || "";

    const questionText = `Please check the ${section.label} section of my resume. The data is: ${inputData}.
    Don't send a big paragraph, only a small one. Don't use any type of asterisk. 
    Answer in this format:
      review: -
      changes: -
    Write "no changes" if it's good.`;

    setQuestion(questionText);
    GenerateAnswer(questionText, section.name);
  };

  const GenerateAnswer = async (questionText, sectionName) => {
    try {
      setLoading((prevLoading) => ({ ...prevLoading, [sectionName]: true })); // Set loading for the specific section
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_GEMINI_AI_API_KEY}`,
        {
          contents: [{ parts: [{ text: questionText }] }],
        }
      );
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [sectionName]: response.data.candidates[0].content.parts[0].text,
      }));
    } catch (error) {
      console.error(error);
      setError(
        "An error occurred while processing your request. Please try again."
      );
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, [sectionName]: false })); // Clear loading for the specific section
    }
  };

  return (
    <div className="w-full h-fit bg-[#edf6f9] p-2">
      <div className="w-full flex flex-col text-center items-center justify-center my-6">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Welcome to the Ultimate Resume checker!
        </h1>
        <h1 className="text-center text-md sm:text-2xl w-3/4 mt-1">
          Copy and paste each section of your resume to review. Check one
          section at a time or go through all sections sequentially—it's up to
          you!
        </h1>
      </div>
      <div className="w-full space-y-4">
        {sections.map((section) => (
          <div key={section.name} className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <form onSubmit={(e) => formQuestion(e, section)}>
              <h3 className="block mb-2 text-md font-medium text-gray-900  ">
                {section.label}
              </h3>
              <textarea
                name={section.name}
                placeholder="Write here"
                className="p-2 rounded-xl border-none outline-none w-full"
                rows={3}
                cols={3}
              ></textarea>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-700 text-white rounded-xl m-2"
                >
                  Check Details
                </button>
              </div>
            </form>
            <div className="p-4 bg-blue-100 flex items-center justify-center rounded-xl">
              {loading[section.name] ? (
                <p>Getting response...</p>
              ) : answers[section.name] ? (
                <div>
                  <p>
                    <strong>Review:</strong>{" "}
                    {answers[section.name].match(
                      /review:\s*(.*?)\s*changes:/i
                    )?.[1] || "No review found."}
                  </p>
                  <p>
                    <strong>Changes:</strong>{" "}
                    {answers[section.name].match(/changes:\s*(.*)/i)?.[1] ||
                      "No changes."}
                  </p>
                </div>
              ) : (
                <p>Your response for {section.label} will be displayed here.</p>
              )}
            </div>
          </div>
        ))}
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ResumeEnquiry;
