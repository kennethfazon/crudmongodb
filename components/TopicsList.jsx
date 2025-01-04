import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch("/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    const data = await res.json();
    console.log("Received topics:", data);  // Add logging to inspect the data structure
    return data.topics || [];  // Return empty array if no topics found
  } catch (error) {
    console.log("Error loading topics: ", error);
    return [];  // Return empty array in case of error
  }
};

export default async function TopicsList() {
  const topics = await getTopics();  // Fetch topics

  console.log("Topics data in component:", topics); // Log topics to inspect

  return (
    <>
      {topics.length > 0 ? (
        topics.map((t) => (
          <div
            key={t._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">{t.title}</h2>
              <div>{t.description}</div>
            </div>

            <div className="flex gap-2">
              <RemoveBtn id={t._id} />
              <Link href={`/editTopic/${t._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No topics available.</p>  // Fallback message if no topics
      )}
    </>
  );
}
