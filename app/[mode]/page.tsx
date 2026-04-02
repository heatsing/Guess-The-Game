import { notFound } from "next/navigation";
import { MODES } from "@/lib/modes";
import { getDailyForModeSmart, isModeKey } from "@/lib/getDailyForMode";
import ModePage from "@/components/ModePage";

export const dynamicParams = false;

export function generateStaticParams() {
  return MODES.map((m) => ({ mode: m.key }));
}

type Props = { params: Promise<{ mode: string }> };

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
