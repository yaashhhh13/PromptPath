import axios from "axios";
import { useState } from "react";

const SubmissionEnquiry = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const formQuestion = async (e) => {
    e.preventDefault();
    const form = e.target;
    const myName = form.myName.value;
    const HRname = form.HRname.value;
    const myEmail = form.myEmail.value;
    const companyName = form.companyName.value;
    const date = form.date.value

    const question = `i sent an cold email to an HR for enquiry about any openings in his company write me 
    a message to send an enquiry message asking the HR that she didn't responded to the message the data is 
    my name : ${myName}
    my email id : ${myEmail}
    name of HR : ${HRname}
    company name : ${companyName}
    sent on : ${date}
     `;
    console.log(question);
    setQuestion(question);
    GenerateAnswer();
  };

  const GenerateAnswer = async () => {
    try {
      //   console.log("getting answer");

      setLoading(true);
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_GEMINI_AI_API_KEY}`,
        {
          contents: [{ parts: [{ text: question }] }],
        }
      );
      console.log(response.data);
      setLoading(false);
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setAnswer("An error occurred while processing your request.");
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-[#edf6f9] p-2">
        <div className="w-full flex flex-col text-center items-center justify-center my-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Welcome to application enquiry writer!
          </h1>
          <h1 className="text-center text:md sm:text-2xl w-3/4 mt-1">
            Fill out a few simple details, and we’ll create a professional
            application enquiry for you—tailored to grab attention and open
            doors!
          </h1>
        </div>
        <form onSubmit={formQuestion}>
          <div className="w-full">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900  ">
                  Your full name
                </h1>
                <input
                  required
                  placeholder="write here"
                  name="myName"
                  className="p-2 rounded-xl border-none outline-none w-full"
                />
              </div>
              <div className="relative p-4 w-full rounded-md">
                <h1 className="block mb-2 text-md font-medium text-gray-900  ">
                  HR Name
                </h1>
                <input
                  required
                  name="HRname"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                  autoComplete="off"
                />
              </div>
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900  ">
                  your email
                </h1>
                <input
                  required
                  name="myEmail"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="relative p-4 w-full rounded-md">
                <h1 className="block mb-2 text-md font-medium text-gray-900  ">
                  company name
                </h1>
                <input
                  required
                  name="companyName"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                  autoComplete="off"
                />
              </div>
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900  ">
                  sent on which date
                </h1>
                <input
                  required
                  name="date"
                  type="date"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex text-center items-center justify-center">
            <button
              type="submit"
              className="px-4 py-2 sm:py-4 bg-blue-700 text-white rounded-xl m-2 self-center"
            >
              send message
            </button>
          </div>
        </form>
        <div
          className={`w-full bg-blue-100 ${answer ? "p-4" : "p-0"} rounded-xl`}
        >
          {loading ? <center>Getting response ....</center> : <p>{answer}</p>}
        </div>
      </div>
    </>
  );
};

export default SubmissionEnquiry;
