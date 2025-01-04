import connectMongoDB from "@/libs/mongodb"; // MongoDB connection utility
import Topic from "@/models/topic"; // Topic model
import { NextResponse } from "next/server";

// POST: Create new topic (not directly needed in your listing page)
export async function POST(request) {
  const { title, description } = await request.json();
  await connectMongoDB(); // Connect to MongoDB
  await Topic.create({ title, description }); // Create a new topic in the database
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}

// GET: Fetch all topics from MongoDB
export async function GET() {
  await connectMongoDB(); // Connect to MongoDB
  const topics = await Topic.find(); // Get all topics from the database
  return NextResponse.json({ topics }); // Return the topics as JSON
}

// DELETE: Delete a topic by ID
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id"); // Get topic ID from query params
  await connectMongoDB(); // Connect to MongoDB
  await Topic.findByIdAndDelete(id); // Delete topic by ID
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
