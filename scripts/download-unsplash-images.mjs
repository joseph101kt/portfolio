// scripts/download-unsplash-images.mjs
import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

// ---- CONFIG ----
const IMAGE_URLS = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1500534314209-a26db0f5c8d8",
  "https://images.unsplash.com/photo-1495567720989-cebdbdd97913",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f",
  "https://images.unsplash.com/photo-1470770903676-69b98201ea1c",
];

// ---- PATH SETUP ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(
  __dirname,
  "..",
  "public",
  "demo_unsplash_images"
);

fs.mkdirSync(outputDir, { recursive: true });

// ---- DOWNLOAD WITH REDIRECT SUPPORT ----
function downloadImage(url, filePath, redirects = 0) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url + "?w=1600&q=80",
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "image/*",
        },
      },
      (res) => {
        // Handle redirects
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          if (redirects > 5) {
            reject(new Error("Too many redirects"));
            return;
          }
          downloadImage(res.headers.location, filePath, redirects + 1)
            .then(resolve)
            .catch(reject);
          return;
        }

        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }

        const file = fs.createWriteStream(filePath);
        res.pipe(file);

        file.on("finish", () => file.close(resolve));
      }
    );

    req.on("error", reject);
  });
}

// ---- MAIN ----
(async () => {
  const jsonOutput = [];

  for (const url of IMAGE_URLS) {
    const id = url.split("/photo-")[1];
    const filename = `unsplash_${id}.jpg`;
    const filePath = path.join(outputDir, filename);

    try {
      console.log(`Downloading ${filename}...`);
      await downloadImage(url, filePath);

      jsonOutput.push({
        id,
        src: `/demo_unsplash_images/${filename}`,
        originalUrl: url,
      });
    } catch (err) {
      console.warn(`⚠️ Skipped ${url}: ${err.message}`);
    }
  }

  fs.writeFileSync(
    path.join(outputDir, "images.json"),
    JSON.stringify(jsonOutput, null, 2)
  );

  console.log("✅ Done");
})();
