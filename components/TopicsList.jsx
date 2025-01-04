import Link from "next/link";
import RemoveBtn from "./RemoveBtn"; // Assuming RemoveBtn is a custom button component for deleting
import { HiPencilAlt } from "react-icons/hi"; // Pencil icon for edit button

// Function to fetch topics from the backend
const getTopics = async () => {
  try {
    const res = await fetch("/api/topics", { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function TopicsList() {
  const { topics } = await getTopics(); // Fetch topics data

  return (
    <>
      {topics.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} /> {/* Custom Remove Button */}
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} /> {/* Edit icon */}
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
