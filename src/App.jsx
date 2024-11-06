import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import JobsInternEnquiry from "./pages/JobInternEnquiry";
import MeetRequest from "./pages/MeetRequest";
import ResumeEnquiry from "./pages/ResumeEnquiry";
import SubmissionEnquiry from "./pages/SubmissionEnquiry";
import ThanksMail from "./pages/ThanksMail";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/IntroductionGenerator" element={<Intro />} />
          <Route path="/EnquiryAboutJobs&Internships" element={<JobsInternEnquiry />} />
          <Route path="/MessageForMeeting" element={<MeetRequest />} />
          <Route path="/ResumeEnquiry" element={<ResumeEnquiry />} />
          <Route path="/AskAboutApplicationStatus" element={<SubmissionEnquiry />} />
          <Route path="/ThankYouMessage" element={<ThanksMail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
