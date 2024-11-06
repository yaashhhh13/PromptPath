import axios from "axios";
import { useState } from "react";

const Intro = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const formQuestion = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fullname = form.fullname.value;
    const currentCityWithState = form.currentCityWithState.value;
    const hometownWithState = form.hometownWithState.value;
    const schoolname = form.schoolname.value;
    const collegName = form.collegName.value;
    const clgStatus = form.clgStatus.value;
    const degreeName = form.degreeName.value;
    const degreeSpecialization = form.degreeSpecialization.value;
    const noOfFamilyMembers = form.noOfFamilyMembers.value;
    const fathersOccupation = form.fathersOccupation.value;
    const siblingDetails = form.siblingDetails.value;
    const mothersOccupation = form.mothersOccupation.value;
    const achievements = form.Achievments.value;
    const skills = form.skills.value;
    const experience = form.experience.value;
    const projects = form.projects.value;
    const extraCurricularActivities = form.extraCurricularActivities.value;
    const others = form.others.value;

    const question = `write a introduction for me. the data to write introduction is 
    Name: ${fullname}
    Current City: ${currentCityWithState}
    Hometown: ${hometownWithState}
    School Name: ${schoolname}
    College Name: ${collegName}
    College Status: ${clgStatus}
    Degree Name: ${degreeName}
    Degree Specialization: ${degreeSpecialization}
    no of family members: ${noOfFamilyMembers}, 
    Fathers Occupation: ${fathersOccupation}
    Mothers Occupation: ${mothersOccupation}
    sibling details: ${siblingDetails}
    Achievements: ${achievements}
    Skills: ${skills}
    Experience: ${experience}
    projects : ${projects}
    Extracurricular Activities: ${extraCurricularActivities}
    Other Information: ${others}
    don't use hashtag.just give the introduction it should look like it is not ai generated
    don't use hard english words 
    the format of introduction should be 
    name & place 
    Hometown - write its speciality
    about college
    about school
    about parents and siblings don't write names
    skills 
    experience 
    achievements
    projects 
    extra curricular activities 
    other details 
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
      <div className="w-full h-fit bg-[#edf6f9] p-2">
        <div className="w-full flex flex-col text-center items-center justify-center my-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Welcome to the Ultimate Intro Generator!
          </h1>
          <h1 className="text-center text-md sm:text-2xl w-3/4 mt-1">
            Just answer a few quick questions, pick your favorite option, and
            let us craft the perfect introduction for you—no prompts needed!
          </h1>
        </div>
        <form autoComplete="off" onSubmit={formQuestion}>
          <div className="w-full">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="relative p-4 w-full rounded-md">
                <h1 className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                  Full Name
                </h1>
                <input
                  name="fullname"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                  autoComplete="off"
                />
              </div>
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                  Current city{" "}
                  <span className="text-sm">
                    (also write state, eg- Bhopal,MP)
                  </span>
                </h1>
                <input
                  name="currentCityWithState"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                />
              </div>
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                  Hometown
                  <span className="text-sm">
                    (also write state, eg- Bhopal,MP)
                  </span>
                </h1>
                <input
                  placeholder="write here"
                  name="hometownWithState"
                  className="p-2 rounded-xl border-none outline-none w-full"
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                  School Name
                </h1>
                <input
                  name="schoolname"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                  autoComplete="off"
                />
              </div>
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                  College name
                </h1>
                <input
                  name="collegName"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                />
              </div>
              <div className="relative p-4 w-full">
                <label
                  for="clgStatus"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Have you completed your degree
                </label>
                <select
                  id="clgStatus"
                  name="clgStatus"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>choose option</option>
                  <option value="Yes, completed">Yes, completed</option>
                  <option value="No, pursuing">No, pursuing</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                  Which degree you are pursuing
                </h1>
                <input
                  name="degreeName"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                  autoComplete="off"
                />
              </div>
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                  Branch or course specialization
                </h1>
                <input
                  name="degreeSpecialization"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                />
              </div>
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                  No of family members
                </h1>
                <input
                  name="noOfFamilyMembers"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                  Father's occupation
                </h1>
                <input
                  name="fathersOccupation"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                />
              </div>
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                  Mothers's occupation
                </h1>
                <input
                  name="mothersOccupation"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                />
              </div>
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                  Sibling details 
                </h1>
                <input
                  name="siblingDetails"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                  autoComplete="off"
                />
              </div>
              
            </div>
          </div>
          <div className="w-full">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                  Achievments
                </h1>
                <textarea
                  name="Achievments"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                  rows={3}
                  cols={3}
                ></textarea>
              </div>
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                  Skills
                </h1>
                <textarea
                  name="skills"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                  rows={3}
                  cols={3}
                ></textarea>
              </div>
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                  Experience
                </h1>
                <textarea
                  name="experience"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                  rows={3}
                  cols={3}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                  Mention your best projects
                </h1>
                <textarea
                  name="projects"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                  rows={3}
                  cols={3}
                ></textarea>
              </div>
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                  Extra Curricular Activities
                </h1>
                <textarea
                  name="extraCurricularActivities"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                  rows={3}
                  cols={3}
                ></textarea>
              </div>
              <div className="relative p-4 w-full">
                <h1 className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                  Other Details if you like to mention in the introduction
                </h1>
                <textarea
                  name="others"
                  placeholder="write here"
                  className="p-2 rounded-xl border-none outline-none w-full"
                  rows={3}
                  cols={3}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="w-full flex text-center items-center justify-center">
            <button
              type="submit"
              className="px-4 py-2 sm:py-4 bg-blue-700 text-white rounded-xl m-2 self-center"
            >
              get introduction
            </button>
          </div>
        </form>
        <div className={`w-full bg-blue-100 ${loading? "p-4" : "p-0"} rounded-xl`}>
          {loading ? <center>Getting response ....</center> : <p>{answer}</p>}
        </div>
      </div>
    </>
  );
};

export default Intro;
