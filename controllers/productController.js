import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({
                    success: false,
                    message: "Name is required"
                })
            case !description:
                return res.status(500).send({
                    success: false,
                    message: "Description is required"
                })
            case !price:
                return res.status(500).send({
                    success: false,
                    message: "Price is required"
                })
            case !category:
                return res.status(500).send({
                    success: false,
                    message: "Category is required"
                })
            case !quantity:
                return res.status(500).send({
                    success: false,
                    message: "Quantity is required"
                })
            case photo && photo.size > 10000000:
                return res.status(500).send({
                    success: false,
                    message: "Photo is required and should be less than 1mb"
                })
        }

        const product = new productModel({ ...req.fields, slug: slugify(name) });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.status(201).send({
            success: true,
            message: "Product created successfully",
            product
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while creating product",
            error
        })

    }
}

export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createAt: -1 })

        res.status(200).send({
            success: true,
            message: "All Products",
            totalCount: products.length,
            products,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting products",
            error
        })
    }
}

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).populate('category').select("-photo")
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting products",
            error
        })
    }
}
export const getSingleProductPhotoController = async (req, res) => {
    try {
        const productPhoto = await productModel.findById(req.params.pid).select("photo");

        if (productPhoto.photo.data) {
            res.set('Content-type', productPhoto.photo.contentType);
            return res.status(200).send(productPhoto.photo.data);
        }


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting product photo",
            error
        })
    }
}

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product deleted successfully",
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error
        })
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({
                    success: false,
                    message: "Name is required"
                })
            case !description:
                return res.status(500).send({
                    success: false,
                    message: "Description is required"
                })
            case !price:
                return res.status(500).send({
                    success: false,
                    message: "Price is required"
                })
            case !category:
                return res.status(500).send({
                    success: false,
                    message: "Category is required"
                })
            case !quantity:
                return res.status(500).send({
                    success: false,
                    message: "Quantity is required"
                })
            case photo && photo.size > 10000000:
                return res.status(500).send({
                    success: false,
                    message: "Photo is required and should be less than 1mb"
                })
        }

        const product = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.status(201).send({
            success: true,
            message: "Product updated successfully",
            product
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating product",
            error
        })
    }
}