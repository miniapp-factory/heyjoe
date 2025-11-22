"use client";

import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type Props = {
  animal: string;
};

export function QuizResult({ animal }: Props) {
  const animalImages: Record<string, string> = {
    cat: "/cat.png",
    dog: "/dog.png",
    fox: "/fox.png",
    hamster: "/hamster.png",
    horse: "/horse.png",
  };

  const animalNames: Record<string, string> = {
    cat: "Cat",
    dog: "Dog",
    fox: "Fox",
    hamster: "Hamster",
    horse: "Horse",
  };

  const imageSrc = animalImages[animal];
  const title = animalNames[animal] ?? "Unknown";

  const shareText = `I am a ${title}! Take the quiz to find out yours: ${url}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl">You are a {title}!</h2>
      <img src={imageSrc} alt={title} className="w-48 h-48" />
      <Share text={shareText} />
      <Button onClick={() => window.location.reload()}>Retake Quiz</Button>
    </div>
  );
}
