import { ShipEngine } from "shipengine";

// Ensure the API Key is defined
const apiKey = process.env.NEXT_PUBLIC_SHIPENGINE_API_KEY;
if (!apiKey) {
  throw new Error("ShipEngine API Key is missing. Please set NEXT_PUBLIC_SHIPENGINE_API_KEY in your .env file.");
}

// Initialize ShipEngine with the API Key
const shipengine = new ShipEngine(apiKey); // Pass the API Key directly as a string

export { shipengine };











// import ShipEngine from "shipengine";

// const shipengine = new ShipEngine({
//   apiKey: process.env.SHIPENGINE_API_KEY as string,
// });

// export { shipengine };
