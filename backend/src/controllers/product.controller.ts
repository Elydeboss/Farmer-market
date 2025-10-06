// src/controllers/product.controller.ts
import { Request, Response } from "express";
import Product from "../models/products.schema";
import { Types } from "mongoose";

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "farmer" | "buyer" | "logistics" | "admin";
  };
}

/**
 * POST /api/products
 * farmer creates a product
 */
export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== "farmer") {
      return res.status(403).json({ message: "Only farmers can create products" });
    }

    const { name, price, quantity, category, location, available } = req.body;

    if (!name || price == null || quantity == null || !category || !location) {
      return res.status(400).json({ message: "name, price, quantity, category, location are required" });
    }

    const product = await Product.create({
      farmer: new Types.ObjectId(req.user.id),
      name,
      price,
      quantity,
      category,
      location,
      available: available !== undefined ? available : true,
    });

    return res.status(201).json({ message: "Product created", product });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * GET /api/products
 * everyone can view, with filters
 * filters: q, category, location, available, minPrice, maxPrice
 * pagination: page, limit
 * sorting: sort=price, -price, createdAt, -createdAt
 */
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { q, category, location, minPrice, maxPrice, available, page = "1", limit = "12", sort } = req.query;

    const filter: Record<string, any> = {};

    if (q && typeof q === "string") {
  // simple, safe regex search on name
  filter.name = { $regex: q, $options: "i" };
}

    if (category && typeof category === "string") {
      filter.category = category;
    }
    if (location && typeof location === "string") {
      filter.location = { $regex: `^${location}$`, $options: "i" };
    }
    if (available !== undefined) {
      if (available === "true" || available === "false") {
        filter.available = available === "true";
      }
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const pageNum = Math.max(parseInt(String(page), 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(String(limit), 10) || 12, 1), 100);
    const skip = (pageNum - 1) * limitNum;

    let sortObj: Record<string, 1 | -1> = { createdAt: -1 };
    if (typeof sort === "string") {
      if (sort.startsWith("-")) {
        sortObj = { [sort.slice(1)]: -1 };
      } else {
        sortObj = { [sort]: 1 };
      }
    }

    const [items, total] = await Promise.all([
      Product.find(filter).sort(sortObj).skip(skip).limit(limitNum).lean(),
      Product.countDocuments(filter),
    ]);

    return res.json({
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      items,
    });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * PATCH /api/products/:id
 * farmer updates own product
 */
export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== "farmer") {
      return res.status(403).json({ message: "Only farmers can update products" });
    }

    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (String(product.farmer) !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own products" });
    }

    const allowed = ["name", "price", "quantity", "category", "location", "available"] as const;
    for (const key of allowed) {
      if (key in req.body) {
        // @ts-expect-error dynamic assign
        product[key] = req.body[key];
      }
    }

    await product.save();

    return res.json({ message: "Product updated", product });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * DELETE /api/products/:id
 * farmer deletes own product
 */
export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== "farmer") {
      return res.status(403).json({ message: "Only farmers can delete products" });
    }

    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (String(product.farmer) !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own products" });
    }

    await product.deleteOne();

    return res.json({ message: "Product deleted" });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * PATCH /api/products/:id/toggle-availability
 * farmer toggles availability
 */
export const toggleAvailability = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== "farmer") {
      return res.status(403).json({ message: "Only farmers can update products" });
    }

    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (String(product.farmer) !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own products" });
    }

    product.available = !product.available;
    await product.save();

    return res.json({ message: "Availability toggled", available: product.available, product });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};
