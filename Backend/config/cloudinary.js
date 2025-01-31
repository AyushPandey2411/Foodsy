import { config } from "dotenv"; // Importing dotenv for environment variables
import cloudinary from "cloudinary"; // ES Module import

config(); // Load environment variables

const cloudinaryInstance = cloudinary.v2; // Require still works with `.v2`

const cloudinaryConnect = () => {
	if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
		console.error("❌ Cloudinary configuration error: Missing environment variables");
		return;
	}

	cloudinaryInstance.config({
		cloud_name: process.env.CLOUD_NAME,
		api_key: process.env.API_KEY,
		api_secret: process.env.API_SECRET,
	});

	console.log("✅ Cloudinary connected successfully!");
};

export { cloudinaryConnect, cloudinaryInstance };
