import { ConvexHttpClient } from "convex/browser";

const client = new ConvexHttpClient("https://precise-chickadee-111.eu-west-1.convex.cloud");

async function run() {
  console.log("Fetching webinars...");
  const webinars = await client.query("webinars:list");
  if (!webinars || webinars.length === 0) {
    console.log("No webinars found");
    return;
  }
  const webinarId = webinars[0]._id;
  console.log("Registering for webinar:", webinarId);

  const registrationId = await client.mutation("registrations:register", {
    webinarId: webinarId,
    clerkUserId: "test_clerk_id",
    userName: "Test User",
    userEmail: "luazii@example.com"
  });
  console.log("Registered with ID:", registrationId);
}

run().catch(console.error);
