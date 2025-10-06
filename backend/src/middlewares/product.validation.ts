import { Request, Response, NextFunction } from "express";

// helpers
const isNonEmptyString = (v: unknown) => typeof v === "string" && v.trim().length > 0;
const isNumber = (v: unknown) => typeof v === "number" && !Number.isNaN(v);
const isBoolean = (v: unknown) => typeof v === "boolean";
const isInt = (v: unknown) => Number.isInteger(v);

// CREATE body
export const validateCreateProduct = (req: Request, res: Response, next: NextFunction) => {
  const { name, price, quantity, category, location, available } = req.body ?? {};

  const errors: string[] = [];

  if (!isNonEmptyString(name)) errors.push("name is required, string");
  if (!isNumber(price) || price < 0) errors.push("price is required, number >= 0");
  if (!isInt(quantity) || quantity < 0) errors.push("quantity is required, integer >= 0");
  if (!isNonEmptyString(category)) errors.push("category is required, string");
  if (!isNonEmptyString(location)) errors.push("location is required, string");
  if (available !== undefined && !isBoolean(available)) errors.push("available must be boolean if provided");

  if (errors.length) return res.status(400).json({ message: "validation failed", errors });
  next();
};

// UPDATE body, allow only listed fields
const allowedUpdateKeys = new Set(["name", "price", "quantity", "category", "location", "available"]);
export const validateUpdateProduct = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body ?? {};
  const keys = Object.keys(body);

  if (keys.length === 0) return res.status(400).json({ message: "nothing to update" });

  for (const k of keys) {
    if (!allowedUpdateKeys.has(k)) {
      return res.status(400).json({ message: `field not allowed: ${k}` });
    }
  }

  if ("name" in body && !isNonEmptyString(body.name)) {
    return res.status(400).json({ message: "name must be non empty string" });
  }
  if ("price" in body && (!isNumber(body.price) || body.price < 0)) {
    return res.status(400).json({ message: "price must be number >= 0" });
  }
  if ("quantity" in body && (!isInt(body.quantity) || body.quantity < 0)) {
    return res.status(400).json({ message: "quantity must be integer >= 0" });
  }
  if ("category" in body && !isNonEmptyString(body.category)) {
    return res.status(400).json({ message: "category must be non empty string" });
  }
  if ("location" in body && !isNonEmptyString(body.location)) {
    return res.status(400).json({ message: "location must be non empty string" });
  }
  if ("available" in body && !isBoolean(body.available)) {
    return res.status(400).json({ message: "available must be boolean" });
  }

  next();
};

// QUERY for GET /api/products
export const validateQueryProducts = (req: Request, res: Response, next: NextFunction) => {
  const { q, category, location, minPrice, maxPrice, available, page, limit, sort } = req.query;

  if (q !== undefined && typeof q !== "string") return res.status(400).json({ message: "q must be string" });
  if (category !== undefined && typeof category !== "string") return res.status(400).json({ message: "category must be string" });
  if (location !== undefined && typeof location !== "string") return res.status(400).json({ message: "location must be string" });

  if (available !== undefined && !(available === "true" || available === "false")) {
    return res.status(400).json({ message: "available must be 'true' or 'false'" });
  }

  if (minPrice !== undefined && Number.isNaN(Number(minPrice))) {
    return res.status(400).json({ message: "minPrice must be number" });
  }
  if (maxPrice !== undefined && Number.isNaN(Number(maxPrice))) {
    return res.status(400).json({ message: "maxPrice must be number" });
  }

  if (page !== undefined && (!/^\d+$/.test(String(page)) || Number(page) < 1)) {
    return res.status(400).json({ message: "page must be integer >= 1" });
  }
  if (limit !== undefined && (!/^\d+$/.test(String(limit)) || Number(limit) < 1 || Number(limit) > 100)) {
    return res.status(400).json({ message: "limit must be integer between 1 and 100" });
  }

  if (sort !== undefined) {
    const s = String(sort);
    const allowed = new Set(["price", "-price", "createdAt", "-createdAt"]);
    if (!allowed.has(s)) return res.status(400).json({ message: "sort must be price, -price, createdAt, -createdAt" });
  }

  next();
};
