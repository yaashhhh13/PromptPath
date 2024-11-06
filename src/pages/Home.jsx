import { Link } from "react-router-dom";

const Home = () => {
  const options = [
    { label: "Introduction Generator", link: "/IntroductionGenerator" },
    { label: "Request for Resume Review and Feedback", link: "/ResumeEnquiry" },
    {
      label: "Cold emails or messages writer",
      link: "/EnquiryAboutJobs&Internships",
    },
    {
      label: "Enquiry About Application Submission",
      link: "/AskAboutApplicationStatus",
    },
  ];

  return (
    <>
      <div className="w-full bg-[#edf6f9] h-fit md:h-screen p-3 sm:p-8">
        <div className="w-full flex items-center text-center justify-center">
          <h1 className="text-3xl sm:text-4xl my-6 leading-none">Welcome to PromptPath</h1>
        </div>
        <div className="w-full flex flex-col items-center justify-center px-0 sm:px-12 md:px-20 lg:px-40 xl:px-60 text-center">
          <h1 className="text-md sm:text-xl my-2">
            the ultimate tool for students looking to elevate their professional
            communication. Our application harnesses the power of the Gemini API
            to streamline your job application process.
          </h1>
          <h1 className="text-md sm:text-xl my-2">
            all you need to do is fill out your information. Our smart
            algorithms take care of the rest, crafting tailored prompts and
            messages that enhance your chances of success. Say goodbye to the
            hassle of writing and hello to a seamless application experience—let
            us help you make a great impression!
          </h1>
        </div>
        <div className="w-full flex items-center justify-center">
          <h1 className="text-2xl my-3 font-semibold">
            Select one of the options below to indicate how we can assist you.
          </h1>
        </div>
        <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
          {options.map((option, index) => {
            return (
              <>
                <Link to={`${option.link}`}>
                  <div className="w-full px-2 sm:px-6 text-white cursor-pointer py-6 sm:py-12 rounded-xl bg-blue-700 flex items-center justify-center">
                    <h1 className="text-lg sm:text-2xl text-center">{option.label}</h1>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
        {/* <API /> */}
      </div>
    </>
  );
};

export default Home;
