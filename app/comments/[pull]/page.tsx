import Link from "next/link";
import {
  timePassed,
  fetchPullRequestDetails,
  fetchPullRequestComments,
} from "@/app/utils";

export const revalidate = 0;

export default async function Page({ params }: { params: { pull: string } }) {
  // Fetch pull request details
  const prDetails = await fetchPullRequestDetails(
    "mamatsa",
    "test-repo",
    +params.pull
  );

  // Fetch pull request comments
  const prComments = await fetchPullRequestComments(
    "mamatsa",
    "test-repo",
    +params.pull
  );

  return (
    <>
      <h1 className="text-2xl font-bold mb-3">Pull Request #{params.pull}</h1>

      {/* Display PR title and body */}
      <div className="mb-5 text-lg">
        <p>
          <span className="font-semibold ">Title: </span>
          {prDetails.title}
        </p>
        <p>
          <span className="font-semibold">Description:</span> {prDetails.body}
        </p>
      </div>

      {/* Display comments */}
      <h2 className="font-bold text-lg">Comments</h2>
      {prComments.map((comment) => (
        <div key={comment.id} className="border mb-3 mt-2 px-3 py-2">
          {/* Comment author and time */}
          <div className="flex items-center gap-2 mb-1">
            <p className="font-bold text-sm">{comment.user?.login}</p>
            <p className="text-xs opacity-50">
              commented {timePassed(comment.created_at)}
            </p>
          </div>

          {/* Comment body */}
          <p>{comment.body}</p>
        </div>
      ))}

      {/* Go back button */}
      <div className="mt-16">
        <Link
          href="/"
          className="cursor-pointer border px-3 py-2 hover:bg-slate-200"
        >
          Go back
        </Link>
      </div>
    </>
  );
}
