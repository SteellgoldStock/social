import { useState, useEffect } from "react";
import { z } from "zod";

const ResponseSchema = z.object({
  count: z.number()
});

const FIVE_SECONDS = 5000;
const TWO_MINUTES = 120000;

const usePollingNotifications = (): number => {
  const [interval, setInterval] = useState<number>(TWO_MINUTES)
  const [notifications, setNotifications] = useState<number>(0)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/user/notifications", {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        })

        const data = ResponseSchema.safeParse(await response.json());
        if (!data.success) {
          setNotifications(0);
          return;
        }

        const count = data.data.count;
        if (count > 0) setInterval(FIVE_SECONDS)
        else setInterval(TWO_MINUTES)

        setNotifications(count)
      } catch (error) {
        console.error("Failed to fetch notifications", error)
      }
    }

    fetchNotifications()

    const intervalId = window.setInterval(fetchNotifications, interval)
    return () => clearInterval(intervalId)
  }, [interval]);

  return notifications;
}

export default usePollingNotifications;