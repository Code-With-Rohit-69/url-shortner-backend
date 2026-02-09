import { generateShortUrl } from "../utils/generateShortUrl.ts";
import Url from "../models/url.model.ts";
import type { UrlDocument } from "../models/url.model.ts";
import type { Request, Response } from "express";

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

const createShortUrl = async (req: Request, res: Response) => {
  const { url } = req.body;
  try {
    if (url.trim().length == 0 || !isValidUrl(url)) {
      return res
        .status(400)
        .json({ message: "Please Provide a valid url.", success: false });
    }

    const existsUrl = await Url.findOne({ originalUrl: url });

    if (existsUrl) {
      return res.status(200).json({
        message: "Url already exists",
        success: true,
        shortCode: existsUrl.shortCode,
      });
    }

    let shortCode: string = "";
    let saved: boolean = false;
    let newUrl: UrlDocument | null = null;

    for (let i = 0; i < 5 && !saved; i++) {
      shortCode = generateShortUrl();

      try {
        newUrl = await Url.create({
          originalUrl: url,
          shortCode,
        });
        saved = true;
      } catch (err: unknown) {
        if ((err as any).code !== 11000) {
          throw err;
        }
      }
    }

    if (!saved || !newUrl) {
      return res
        .status(500)
        .json({ success: false, message: "Could not generate unique code" });
    }

    return res.status(201).json({
      success: true,
      shortCode: newUrl.shortCode,
    });
  } catch (error: unknown) {
    console.log("Error in createShortUrl controller", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error.", success: false });
  }
};

const redirectShortUrl = async (req: Request, res: Response) => {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res
        .status(404)
        .json({ message: "Short URL not found", success: false });
    }

    url.clicks += 1;

    await url.save();

    return res.redirect(url.originalUrl);
  } catch (error: unknown) {
    console.log("Error in redirectShortUrl controller " + error);
    return res
      .status(500)
      .json({ message: "Internal Server Error.", success: false });
  }
};

export { createShortUrl, redirectShortUrl };
