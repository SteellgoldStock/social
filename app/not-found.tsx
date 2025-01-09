import { buttonVariants } from "@/components/ui/button";
import { AsyncComponent } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

type NotFoundProps = {
  reason?: "userNotFound" | "notFound";
};

const NotFound: AsyncComponent<NotFoundProps> = async ({ reason = "notFound" }) => {
  const t = await getTranslations("NotFound");

  return (
    <div className={"absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm"}>
      <h2 className="text-lg sm:text-xl md:text-3xl font-bold">
        {reason == "notFound" ? t("Title") : t("Specials.Ghostbusters.Title")}
      </h2>

      <p className="mb-4 text-center">
        {reason == "userNotFound"
          ? <>
              {t("Specials.Ghostbusters.Description.0")}&nbsp;
              <a href="tel:555-2368" className="font-bold hover:underline">555-2368</a>&nbsp;
              {t("Specials.Ghostbusters.Description.1")}
            </>
          : t("Description")
        }
      </p>

      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        {t("Button")}
      </Link>
    </div>
  )
}

export default NotFound;