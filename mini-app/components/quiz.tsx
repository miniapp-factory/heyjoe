"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { QuizResult } from "./quiz-result";

type Option = {
  text: string;
  animal: string;
};

type Question = {
  question: string;
  options: Option[];
};

const questions: Question[] = [
  {
    question: "What is your favorite type of food?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Meat", animal: "dog" },
      { text: "Berries", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Grain", animal: "horse" },
    ],
  },
  {
    question: "Which activity do you enjoy most?",
    options: [
      { text: "Sleeping", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Hunting", animal: "fox" },
      { text: "Storing food", animal: "hamster" },
      { text: "Running", animal: "horse" },
    ],
  },
  {
    question: "What is your preferred environment?",
    options: [
      { text: "Indoor", animal: "cat" },
      { text: "Outdoor", animal: "dog" },
      { text: "Forest", animal: "fox" },
      { text: "Cage", animal: "hamster" },
      { text: "Pasture", animal: "horse" },
    ],
  },
  {
    question: "How do you handle stress?",
    options: [
      { text: "Curl up", animal: "cat" },
      { text: "Run around", animal: "dog" },
      { text: "Hide", animal: "fox" },
      { text: "Hide food", animal: "hamster" },
      { text: "Gallop away", animal: "horse" },
    ],
  },
  {
    question: "What is your favorite sound?",
    options: [
      { text: "Purr", animal: "cat" },
      { text: "Bark", animal: "dog" },
      { text: "Howl", animal: "fox" },
      { text: "Squeak", animal: "hamster" },
      { text: "Neigh", animal: "horse" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function Quiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [resultAnimal, setResultAnimal] = useState<string>("");

  const shuffledOptions = useMemo(
    () => shuffleArray(questions[current].options),
    [current]
  );

  const handleAnswer = (animal: string) => {
    setScores((prev) => ({
      ...prev,
      [animal]: (prev[animal] ?? 0) + 1,
    }));
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const best = Object.entries(scores).reduce(
        (a, b) => (b[1] > a[1] ? b : a),
        ["", 0]
      )[0];
      setResultAnimal(best);
      setShowResult(true);
    }
  };

  if (showResult) {
    return <QuizResult animal={resultAnimal} />;
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl mb-4">{questions[current].question}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt) => (
          <Button key={opt.text} onClick={() => handleAnswer(opt.animal)}>
            {opt.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
