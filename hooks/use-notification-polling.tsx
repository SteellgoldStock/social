import { useState, useEffect } from "react";
import { z } from "zod";

const ResponseSchema = z.object({
  count: z.number()
})

const usePollingNotifications = (): number => {
  const [interval, setInterval] = useState<number>(60000);
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
        if (count > 0) setInterval(5000)
        else setInterval(60000)

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