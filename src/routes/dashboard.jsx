import Dashboard from "../views/Dashboard/Dashboard";
import UserProfile from "../views/Patient/UserProfile";
import Attendance from "../views/Attendance/Patient";
import Health from "../views/Health/Health";
import Notifications from "../views/Notifications/Notifications";
import Patientdetails from "../views/Patient/Patientdetails";
import Feedback from '../views/Feedback/All_Feedback'

const dashboardRoutes = [
  {
    path: "/home",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    path: "/user",
    name: "Patient Details",
    icon: "pe-7s-user",
    component: UserProfile
  },
  {
    path: "/attendance",
    name: "Attendance",
    icon: "pe-7s-note2",
    component: Attendance
  },
  {
    path: "/tip",
    name: "Health Tip",
    icon: "pe-7s-news-paper",
    component: Health
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications
  },
  {
    path: "/feedback",
    name: "Feedback",
    icon: "pe-7s-like",
    component: Feedback
  },
  {
    path: "/:patient",
    component: Patientdetails
  },
 {redirect : true ,path:"/" ,to:"/home" ,name:"Dashboard" }


];

export default dashboardRoutes;
