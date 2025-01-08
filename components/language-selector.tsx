"use client";

import { useTranslations } from "next-intl";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { useLanguageStore } from "@/lib/hooks/use-lang";
import { useRouter } from "next/navigation";
import { ISOLang } from "@/lib/types/lang";
import { useState } from "react";

export const LanguageSelector = () => {
  const t = useTranslations("LanguageSelector");
  const { lang, setLang } = useLanguageStore();
  const router = useRouter();
  const [isTriggered, setIsTriggered] = useState(false);

  return (
    <Select 
      onValueChange={(e: ISOLang) => {
        setLang(e);
        router.refresh();
      }} 
      value={lang}
      open={isTriggered}
      onOpenChange={(e) => setIsTriggered(e)}
    >
      <SelectTrigger showArrow={false}>
        <SelectValue placeholder={t("Placeholder")}>
          {t("Options." + lang + ".Emoji")}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t("Label")}</SelectLabel>
          <SelectItem value="en">{t("Options.en.Label")}</SelectItem>
          <SelectItem value="fr">{t("Options.fr.Label")}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}