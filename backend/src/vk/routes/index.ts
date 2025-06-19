import schemaimg from "./schemaimg";
import schema from "./schema";
import notifications from "./notifications";
import routes from "./routes";
import profile from "./profile";
import showtop from "./showtop";
import setfilter from "./setfilter";
import settypenodes from "./settypenodes";
import favoritessave from "./favoritessave";
import top from "./top";
import time from "./time";
import auth from "../middleware/auth";
import route from "..";
//import clearroutersave from "./clearroutersave";

route.use(auth);

route.get("/schemaimg", schemaimg);

route.get("/schema", schema);

route.get("/notifications", notifications);

route.post("/routes", routes);

//route.post("/clearroutersave", clearroutersave);

route.get("/profile", profile);

route.get("/showtop", showtop);

route.post("/setfilter", setfilter);

route.post("/settypenodes", settypenodes);

route.post("/favoritessave", favoritessave);

route.get("/top", top);

route.get("/time", time);

export default route;
