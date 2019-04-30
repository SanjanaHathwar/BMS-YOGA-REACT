
import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Patientdetails from "../views/Patient/Patientdetails";
var indexRoutes = [{ path: "/Dashboard", name: "Home", component: Dashboard },
{path:'/:patient',name:"details" ,component:Patientdetails}];

export default indexRoutes;
