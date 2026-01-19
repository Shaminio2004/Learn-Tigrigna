
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, RotateCcw, CheckCircle, XCircle, Star } from 'lucide-react';

const quizData = {
  alphabet: [
    { question: 'Which letter makes the "ma" sound?', options: ['መ', 'ነ', 'ረ', 'ሰ'], correct: 0, explanation: 'መ (mə) is the correct answer' },
    { question: 'What does ሰላም mean?', options: ['goodbye', 'thank you', 'peace/hello', 'water'], correct: 2, explanation: 'ሰላም means peace or hello in Tigrigna' },
    { question: 'Which letter comes after መ?', options: ['ሠ', 'ረ', 'ለ', 'ሐ'], correct: 0, explanation: 'ሠ follows መ in the Geʽez alphabet order' },
    { question: 'How do you say "mother" in Tigrigna?', options: ['ኣቦ', 'ኣደ', 'ወዲ', 'ጓል'], correct: 1, explanation: 'ኣደ (ade) means mother' }
  ],
  vocabulary: [
    { question: 'What is "water" in Tigrigna?', options: ['ማይ', 'ሻሂ', 'ቡን', 'እንጀራ'], correct: 0, explanation: 'ማይ (may) means water' },
    { question: 'Which word means "house"?', options: ['ገዛ', 'መጽሓፍ', 'ጸሓይ', 'ለይቲ'], correct: 0, explanation: 'ገዛ (geza) means house' },
    { question: 'How do you say "book"?', options: ['ቤት', 'መጽሓፍ', 'ቀትሪ', 'ዓቢ'], correct: 1, explanation: 'መጽሓፍ (meshaf) means book' },
    { question: 'What does ጸሓይ mean?', options: ['moon', 'stars', 'sun', 'water'], correct: 2, explanation: 'ጸሓይ (tsehay) means sun' }
  ],
  numbers: [
    { question: 'What is "three" in Tigrigna?', options: ['ሓደ', 'ክልተ', 'ሰለስተ', 'ኣርባዕተ'], correct: 2, explanation: 'ሰለስተ (seleste) means three' },
    { question: 'How do you say "ten"?', options: ['ዓስርተ', 'ሓሙሽተ', 'ሽድሽተ', 'ዕስራ'], correct: 0, explanation: 'ዓስርተ (aserte) means ten' },
    { question: 'What number is ሓሙሽተ?', options: ['four', 'five', 'six', 'seven'], correct: 1, explanation: 'ሓሙሽተ (hamushte) means five' },
    { question: 'Which is "twenty"?', options: ['ዓስርተ', 'ዕስራ', 'ሰላሳ', 'ኣርብዓ'], correct: 1, explanation: 'ዕስራ (isra) means twenty' }
  ]
};

type QuizCategory = keyof typeof quizData;

const QuizSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>('alphabet');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuiz = quizData[selectedCategory];
  const currentQuestion = currentQuiz[currentQuestionIndex];
  const progress = ((currentQuestionIndex + (showResult ? 1 : 0)) / currentQuiz.length) * 100;

  const handleCategoryChange = (category: QuizCategory) => {
    setSelectedCategory(category);
    resetQuiz();
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const isCorrect = answerIndex === currentQuestion.correct;
    if (isCorrect && !answeredQuestions[currentQuestionIndex]) {
      setScore(prev => prev + 1);
    }
    
    setAnsweredQuestions(prev => {
      const updated = [...prev];
      updated[currentQuestionIndex] = true;
      return updated;
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / currentQuiz.length) * 100;
    if (percentage >= 90) return { message: "Excellent! 🌟", color: "text-green-600" };
    if (percentage >= 70) return { message: "Great job! 👏", color: "text-blue-600" };
    if (percentage >= 50) return { message: "Good effort! 👍", color: "text-yellow-600" };
    return { message: "Keep practicing! 💪", color: "text-orange-600" };
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Knowledge Quiz</h2>
        <p className="text-gray-600 mb-6">Test your Tigrigna learning progress</p>
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.keys(quizData).map((category) => (
          <Card 
            key={category}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedCategory === category ? 'ring-2 ring-purple-500 bg-purple-50' : ''
            }`}
            onClick={() => handleCategoryChange(category as QuizCategory)}
          >
            <CardContent className="p-4 text-center">
              <div className="text-lg font-semibold capitalize mb-2">{category}</div>
              <div className="text-sm text-gray-600">
                {quizData[category as QuizCategory].length} questions
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!quizCompleted ? (
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span className="capitalize">{selectedCategory} Quiz</span>
              </div>
              <Badge variant="outline">
                {currentQuestionIndex + 1} / {currentQuiz.length}
              </Badge>
            </CardTitle>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-xl font-semibold text-center">
              {currentQuestion.question}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentQuestion.options.map((option, index) => {
                let buttonVariant: "default" | "outline" | "destructive" | "secondary" = "outline";
                let iconElement = null;

                if (showResult) {
                  if (index === currentQuestion.correct) {
                    buttonVariant = "default";
                    iconElement = <CheckCircle className="w-4 h-4 text-green-600" />;
                  } else if (index === selectedAnswer && index !== currentQuestion.correct) {
                    buttonVariant = "destructive";
                    iconElement = <XCircle className="w-4 h-4 text-red-600" />;
                  }
                }

                return (
                  <Button
                    key={index}
                    variant={buttonVariant}
                    className="p-4 h-auto text-left justify-start"
                    onClick={() => !showResult && handleAnswerSelect(index)}
                    disabled={showResult}
                  >
                    <div className="flex items-center space-x-2">
                      {iconElement}
                      <span className="text-lg">{option}</span>
                    </div>
                  </Button>
                );
              })}
            </div>

            {showResult && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  {selectedAnswer === currentQuestion.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="font-semibold">
                    {selectedAnswer === currentQuestion.correct ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                <p className="text-blue-700">{currentQuestion.explanation}</p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Score: {score} / {answeredQuestions.filter(Boolean).length}
              </div>
              {showResult && (
                <Button onClick={nextQuestion}>
                  {currentQuestionIndex < currentQuiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Quiz Completed */
        <Card className="bg-gradient-to-br from-green-50 to-blue-50">
          <CardContent className="p-8 text-center space-y-6">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold">Quiz Completed!</h3>
            
            <div className="space-y-4">
              <div className="text-2xl font-semibold">
                Final Score: {score} / {currentQuiz.length}
              </div>
              <div className="text-xl font-medium">
                {Math.round((score / currentQuiz.length) * 100)}%
              </div>
              <div className={`text-lg font-semibold ${getScoreMessage().color}`}>
                {getScoreMessage().message}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={resetQuiz} className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </Button>
              <Button variant="outline" onClick={() => {
                const categories = Object.keys(quizData) as QuizCategory[];
                const currentIndex = categories.indexOf(selectedCategory);
                const nextCategory = categories[(currentIndex + 1) % categories.length];
                handleCategoryChange(nextCategory);
              }}>
                <Star className="w-4 h-4 mr-2" />
                Try Next Category
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quiz Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-800 mb-2">📝 Quiz Tips</h3>
        <div className="text-yellow-700 space-y-1">
          <p>• Take your time to read each question carefully</p>
          <p>• Review the explanations to learn from mistakes</p>
          <p>• Retake quizzes to improve your scores</p>
          <p>• Practice regularly to reinforce your learning</p>
        </div>
      </div>
    </div>
  );
};

export default QuizSection;
