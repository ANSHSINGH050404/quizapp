"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { questions } from "@/app/data/questions";
import { cn } from "@/lib/utils"; // optional: for className merging

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
    setFeedback(
      isCorrect
        ? "✅ Correct!"
        : `❌ Wrong! The correct answer is "${questions[currentQuestion].answer}".`
    );
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
      <div className="min-h-screen flex items-center justify-center p-4 text-center">
        <Card className="w-full max-w-xl p-6 space-y-4 shadow-lg">
          <CardHeader>
            <h1 className="text-3xl font-bold text-green-600">🎉 Quiz Completed!</h1>
          </CardHeader>
          <CardContent>
            <p className="text-lg">Thanks for participating.</p>
            <p className="text-xl font-semibold mt-4">
              Your Score: <span className="text-blue-600">{score} / {questions.length}</span>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-xl p-6 shadow-xl">
        <CardHeader className="space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>Score: {score}</span>
          </div>
          <h2 className="text-xl font-bold">{question.question}</h2>
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question.options.map((option) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === question.answer;

            return (
              <Button
                key={option}
                onClick={() => handleOptionClick(option)}
                disabled={!!selectedOption}
                variant={isSelected ? (isCorrect ? "default" : "destructive") : "outline"}
                className={cn(
                  "py-6 text-sm font-semibold transition-all",
                  selectedOption && isCorrect && option === selectedOption && "bg-green-500 text-white hover:bg-green-600"
                )}
              >
                {option}
              </Button>
            );
          })}
        </CardContent>

        {feedback && (
          <div className="mt-4 text-lg font-medium text-center">
            <p className={feedback.startsWith("✅") ? "text-green-600" : "text-red-600"}>
              {feedback}
            </p>
          </div>
        )}

        {showNext && (
          <CardFooter className="flex justify-center mt-4">
            <Button onClick={handleNext} className="w-full max-w-xs">
              Next Question
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
