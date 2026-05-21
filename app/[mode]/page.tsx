import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MODES } from "@/lib/modes";
import { getDailyForModeSmart, isModeKey } from "@/lib/getDailyForMode";
import ModePage from "@/components/ModePage";
import { buildMetadata } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return MODES.map((m) => ({ mode: m.key }));
}

type Props = { params: Promise<{ mode: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mode } = await params;
  if (!isModeKey(mode)) {
    return {};
  }

  const modeConfig = MODES.find((item) => item.key === mode)!;

  return buildMetadata({
    title: modeConfig.label,
    description: `${modeConfig.description} A fresh round appears every day at 00:00 UTC with local streak tracking on this device.`,
    path: modeConfig.href,
    keywords: [modeConfig.label, modeConfig.shortLabel, "daily clue game", "image clues"],
  });
}

export default async function ModeRoute({ params }: Props) {
  const { mode } = await params;
  if (!isModeKey(mode)) {
    notFound();
  }
  const modeConfig = MODES.find((m) => m.key === mode)!;
  const daily = await getDailyForModeSmart(mode);
  return (
    <ModePage
      modeKey={modeConfig.key}
      modeLabel={modeConfig.label}
      description={modeConfig.description}
      daily={daily}
    />
  );
}
