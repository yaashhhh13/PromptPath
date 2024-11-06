import axios from "axios";
import { useState } from "react";

const JobsInternEnquiry = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const formQuestion = async (e) => {
    e.preventDefault();
    const form = e.target;
    const myName = form.myName.value;
    const HRname = form.HRname.value;
    const role = form.role.value;
    const year = form.year.value;
    const companyName = form.companyName.value;
    const enquireAbout = form.enquireAbout.value;

    const question = `i got the email of an company's HR.
     write me an cold email to enquire about the job/internships openings in his company
     frame message using the follwoing data :-
     message should be like this 
     subject of email :- 
     body of email:- 
     myName: ${myName}
     HR name: ${HRname}
     applying for which role: ${role}
     company name : ${companyName}
     writing message to enquire about: ${enquireAbout}
     i am studying in : ${year} of my college 
     after the message the resume is attached
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
            Welcome to cold emails or  messages writer!
          </h1>
          <h1 className="text-center text-md sm:text-2xl w-3/4 mt-1">
            Answer a few quick questions, and we will craft a personalized cold
            email or message for you that’s ready to send—no prompts needed!
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
                  name="HRname"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                  autoComplete="off"
                />
              </div>
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900  ">
                  Company name
                </h1>
                <input
                  name="companyName"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900  ">
                  For which role you want to apply
                </h1>
                <input
                  placeholder="write here"
                  name="role"
                  className="p-2 rounded-xl border-none outline-none w-full"
                />
              </div>
              <div className="relative p-4 w-full">
                <label
                  for="enquiry"
                  className="block mb-2 text-md font-medium text-gray-900  "
                >
                  you want to enquire about
                </label>
                <select
                  id="enquiry"
                  name="enquireAbout"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>choose option</option>
                  <option value="Internship">Internship</option>
                  <option value="Full time job">Full time job</option>
                </select>
              </div>
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900  ">
                  which year you are in ?
                </h1>
                <input
                  name="year"
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
              write message
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

export default JobsInternEnquiry;
