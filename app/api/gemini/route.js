import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { initialMessage } from "@/lib/data";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY || "",
});

export const runtime = "edge";

const generateId = () => Math.random().toString(36).slice(2, 15);

const buildGoogleGenAIPrompt = (messages) => [
  {
    id: generateId(),
    role: "user",
    content: initialMessage.content,
  },
  ...messages.map((message) => ({
    id: message.id || generateId(),
    role: message.role,
    content: message.content,
  })),
];

export async function POST(request) {
  const { messages } = await request.json();

  const stream = await streamText({
    model: google("gemini-2.0-flash"),
    messages: buildGoogleGenAIPrompt(messages),
    temperature: 0.7,
  });

  return stream?.toDataStreamResponse();
}
//----------------------------------------i need  to delete the one which is below and above one works fine
// /app/api/gemini/route.js

// import { streamText } from "ai";
// import { createGoogleGenerativeAI } from "@ai-sdk/google";
// import { initialMessage } from "@/lib/data"; // Your initial chatbot message
// import { fetchNearbyPlaces } from "@/lib/map"; // Your custom Google Maps function

// const google = createGoogleGenerativeAI({
//   apiKey: process.env.GOOGLE_API_KEY || "",
// });

// export const runtime = "edge"; // Optional: for Next.js edge runtime

// const generateId = () => Math.random().toString(36).slice(2, 15);

// const buildGoogleGenAIPrompt = (messages, mapData = "") => [
//   {
//     id: generateId(),
//     role: "user",
//     content: initialMessage.content,
//   },
//   ...messages.map((message) => ({
//     id: message.id || generateId(),
//     role: message.role,
//     content: message.content,
//   })),
//   ...(mapData
//     ? [
//         {
//           id: generateId(),
//           role: "system",
//           content: `Here is some real-world location data from Google Maps:\n\n${mapData}`,
//         },
//       ]
//     : []),
// ];

// function extractLocationAndKeyword(userText) {
//   const regex =
//     /(?:find|show|search)?\s*([\w\s]+?)\s*(?:near|in)?\s*([\w\s,-]+)?$/i;
//   const match = userText.match(regex);

//   const keyword = match?.[1]?.trim() || "";
//   const location = match?.[2]?.trim() || "";

//   return { keyword, location };
// }

// // The actual POST request handler for /api/gemini
// export async function POST(request) {
//   const { messages } = await request.json();

//   const lastMessage = messages[messages.length - 1]?.content || "";

//   const { keyword, location } = extractLocationAndKeyword(lastMessage);

//   let mapData = "";
//   try {
//     if (keyword && location) {
//       mapData = await fetchNearbyPlaces({ location, keyword });
//     }
//   } catch (e) {
//     console.error("Map fetch error:", e);
//     mapData = "Could not retrieve map data due to an internal error.";
//   }

//   const stream = await streamText({
//     model: google("gemini-2.0-pro"), // Or "gemini-1.5-pro" or "gemini-pro-vision"
//     messages: buildGoogleGenAIPrompt(messages, mapData),
//     temperature: 0.7,
//   });
//   if (!stream) {
//     console.error("No stream returned from streamText");
//   } else {
//     console.log("Stream generated successfully");
//   }

//   return stream?.toDataStreamResponse();
// }
