import logo from './logo.svg';

import AdminSignIn from './components/AdminSignIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import Professionalsignup from './components/Professionalsignup';
import ProfessionalSignin from './components/ProfessionalSignin';
import ProfessionalDashboard from './components/ProfessionalDashboard';
import ClientSignup from './components/ClientSignup';
import ClientSignin from './components/ClientSignin';
import ClientDashboard from './components/ClientDashboard';
import ProfessionalProfileCreated from './components/ProfessionalProfileCreated';
import FindProfessionals from './components/FindProfessionals';
import AskQuestions from './components/AskQuestions';
import AdminQaA from './components/AdminQaA';
import ClientSeeQaA from './components/ClientSeeQaA';
import PostProjects from './components/PostProjects';
import ProfessionalViewProjects from './components/ProfessionalViewProjects';
import Addpost from './components/Addpost';
import ViewAllPosts from './components/ViewAllPosts';
import SearchProducts from './components/SearchProducts';
import SearchProjects from './components/SearchProjects';
import AddProducts from './components/AddProducts';
import ProfessionalViewProducts from './components/ProfessionalViewProducts';
import ProfessionalProfileView from './components/ProfessionalProfileView';
import SeeFeedbacks from './components/SeeFeedbacks';
import GetJob from './components/GetJob';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AdminSignIn/>}/>
      <Route path="/admindashboard" element={<AdminDashboard/>}/>
      <Route path="/professionalsignup" element={<Professionalsignup/>}/>
      <Route path="/professionallogin" element={<ProfessionalSignin/>}/>
      <Route path="/professionaldashboard" element={<ProfessionalDashboard/>}/>
      <Route path="/clientsignup" element={<ClientSignup/>}/>
      <Route path="/clientlogin" element={<ClientSignin/>}/>
      <Route path="/clientdashboard" element={<ClientDashboard/>}/>
      <Route path="/profilecreation" element={<ProfessionalProfileCreated/>}/>
      <Route path="/searchProfessionals" element={<FindProfessionals/>}/>
      <Route path="/askQuestions" element={<AskQuestions/>}/>
      <Route path="/professionalQaA" element={<AdminQaA/>}/>
      <Route path="/seeQuestionAnswers" element={<ClientSeeQaA/>}/>
      <Route path="/postProjects" element={<PostProjects/>}/>
      <Route path="/ViewProjectProfessional" element={<ProfessionalViewProjects/>}/>
      <Route path="/addPost" element={<Addpost/>}/>
      <Route path="/viewAllPosts" element={<ViewAllPosts/>}/>
      <Route path="/searchProducts" element={<SearchProducts/>}/>
      <Route path="/searchProjects" element={<SearchProjects/>}/>
      <Route path="/addProducts" element={<AddProducts/>}/>
      <Route path="/professionalViewProducts" element={<ProfessionalViewProducts/>}/>
      <Route path="/professionalProfileView/:userId" element={<ProfessionalProfileView/>}/>
      <Route path="/seefeedbacks" element={<SeeFeedbacks/>}/>
      <Route path="/getjobs" element={<GetJob/>}/>

      </Routes>
      </BrowserRouter>
  );
}

export default App;
