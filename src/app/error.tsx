"use client";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div>
      <p>Error: {error.message}</p>
      <div>
        <button onClick={() => reset()}>Try again</button>
      </div>
    </div>
  );
};
export default Error;
