import Url from "../models/url.model.js";
import { generateShortUrl } from "../utils/generateShortUrl.js";

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

const createShortUrl = async (req, res) => {
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

    let shortCode;
    let saved = false;
    let newUrl;

    for (let i = 0; i < 5 && !saved; i++) {
      shortCode = generateShortUrl();

      try {
        newUrl = await Url.create({
          originalUrl: url,
          shortCode,
        });
        saved = true;
      } catch (err) {
        if (err.code !== 11000) throw err;
      }
    }

    if (!saved) {
      return res
        .status(500)
        .json({ success: false, message: "Could not generate unique code" });
    }

    return res.status(201).json({
      success: true,
      shortCode: newUrl.shortCode,
    });
  } catch (error) {
    console.log("Error in createShortUrl controller " + error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error.", success: false });
  }
};

const redirectShortUrl = async (req, res) => {
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
  } catch (error) {
    console.log("Error in redirectShortUrl controller " + error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error.", success: false });
  }
};

export { createShortUrl, redirectShortUrl };
