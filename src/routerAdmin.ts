import express  from "express";
const routerAdmin = express.Router();
import restaurantController from "./controller/restaurant.controller";

routerAdmin.get("/", restaurantController.goHome);

routerAdmin.get("/login", restaurantController.getLogin);

routerAdmin.get("/signup", restaurantController.getSign);


export default routerAdmin;


