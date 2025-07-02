"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { questions } from "@/app//data/questions";

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    const isCorrect = option === questions[currentQuestion].answer;
    if (isCorrect) setScore((prev) => prev + 1);
    setFeedback(isCorrect ? "Correct!" : `Wrong! The correct answer is ${questions[currentQuestion].answer}.`);
    setShowNext(true);
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => prev + 1);
    setSelectedOption(null);
    setFeedback("");
    setShowNext(false);
  };

  if (currentQuestion >= questions.length) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">Quiz Completed!</h1>
        <p className="mt-2">Thanks for participating.</p>
        <p className="mt-2 text-lg">Your Score: {score} / {questions.length}</p>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <Card>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{question.question}</h2>
            <span className="text-sm font-medium text-gray-500">Score: {score}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {question.options.map((option) => (
              <Button
                key={option}
                variant={selectedOption === option ? "outline" : "default"}
                onClick={() => handleOptionClick(option)}
                disabled={!!selectedOption}
              >
                {option}
              </Button>
            ))}
          </div>
          {feedback && <p className="text-lg font-medium">{feedback}</p>}
          {showNext && (
            <Button className="mt-2" onClick={handleNext}>
              Next Question
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}