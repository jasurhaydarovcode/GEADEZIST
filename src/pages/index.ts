// Admin pages
import Home from './Admin/Home';
import NotFound from './Admin/NotFound';
import Dashboard from './Admin/Dashboard';
import Test from './Admin/Test';
import AllUser from './Admin/AllUser';
import User from './Admin/User';
import Archive from './Admin/Archive';
import Employees from './Admin/Employees';
import InspectorAdmin from './Admin/InspectorAdmin';
import Category from './Admin/Category';
import Profile from './Admin/Profile';
import Address from './Admin/Address';

// Authentication pages
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import Offer from './Authentication/Offer';
import Confirm from './Authentication/Confirm';
import ResetPassword from './Authentication/ResetPassword';
import ConfirmSignUp from './Authentication/ConfirmSignUp';

// Client pages
import ClientDashboard from './Client/ClientDashboard';
import ClientProfile from './Client/ClientProfile';
import ClientTestStart from './Client/ClientTestStart';
import ClientQuiz from './Client/ClientQuiz';

// Components
import TestVisual from '../components/test/testVisual';

export {
    Home, NotFound,
    SignIn, SignUp, Offer, Confirm, ResetPassword,
    ClientDashboard, ClientProfile, ClientTestStart, ClientQuiz,
    Dashboard, Test, AllUser, User, Archive, Employees, InspectorAdmin,
    Category, Profile, ConfirmSignUp, TestVisual,Address
};