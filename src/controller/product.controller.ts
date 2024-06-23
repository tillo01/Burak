import { Request, Response } from "express";
import Errors from "../libs/types/Errors";
import {T} from "../libs/types/common";
import ProductService from "../models/Product.service";


const productService = new ProductService();
const productController: T = {};

productController.getAllProducts = async (req:Request, res:Response)=>{
try {
    console.log("getAllProducts" );
    res.render("products")
    
} catch (err) {

console.log("Error on product section", err);
if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code) .json(Errors.standard); 
}
};

productController.createNewProduct = async (req:Request, res:Response)=>{
try{
    console.log("createNewProduct");
    

}
catch(err){
    console.log("Errors, createNewProduct",err);
    
    if(err instanceof Errors) res.status(err.code) .json(err);
    else res.status(Errors.standard.code) .json(Errors.standard);

}
};

productController.updateChoosenProduct = async (req:Request, res:Response)=>{
try {
    console.log("updateChoosenProduct");
    
    

} catch (err) {
    console.log("updateChoosenProduct", err);
    if(err instanceof Errors) res.status(err.code) .json(err);
    else res.status(Errors.standard.code) .json(Errors.standard);
    
}
};

export default productController;
