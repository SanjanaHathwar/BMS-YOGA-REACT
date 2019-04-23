import Dashboard from "views/Dashboard/Dashboard";
import UserProfile from "views/Patient/UserProfile";
import TableList from "views/TableList/TableList";
import Typography from "views/Typography/Typography";
import Notifications from "views/Notifications/Notifications";
import Patientdetails from "../views/Patient/Patientdetails";


const dashboardRoutes = [
  {
    path: "/dashboard",
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
    path: "/table",
    name: "Attendance",
    icon: "pe-7s-note2",
    component: TableList
  },
  {
    path: "/typography",
    name: "Health Tip",
    icon: "pe-7s-news-paper",
    component: Typography
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
    component: Notifications
  },
  {
    path: "/:patient",
    component: Patientdetails
  },
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }

];

export default dashboardRoutes;
