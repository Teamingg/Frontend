"use client";

const connectNotification = (): EventSource => {
  const eventSource = new EventSource(
    `${process.env.NEXT_PUBLIC_API_URL}/sse/subscribe`,
    {
      withCredentials: true,
    }
  );

  return eventSource;
};

export default connectNotification;
