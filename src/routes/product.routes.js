import { Router } from "express";
import { ProductManager } from "../dao/productManager.js";

const productService = new ProductManager("products.json")

const validateFields = (req,res,next)=>{
    const productInfo = req.body;
    if(!productInfo.title || !productInfo.description || !productInfo.code || !productInfo.price || !productInfo.status || !productInfo.stock || !productInfo.category ){
        return res.json({status:"error", message: "campos incompletos"})
    } else{
        next();
    }
};

const router = Router();

router.get("/", async(req,res)=>{
    try {
        const limit = req.query.limit;
        const products = await productService.get();
        if(limit){
            //devolver los productos de acuerdo al limite
            
        }else{
            res.json({status:"success", data:products});            
        }
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

router.get("/:pid", (req,res)=>{});

router.post("/", validateFields, async(req,res)=>{
    //agregar el producto
    try {
        const productInfo = req.body;
        const productCreated = await productService.save(productInfo);
        res.json({status:"success", data:productCreated, message:"producto creado"});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

router.put("/:pid", validateFields,(req,res)=>{
    const productInfo = req.body;
    //actualizar el producto
});

router.delete("/:pid",(req,res)=>{});




export {router as productsRouter}