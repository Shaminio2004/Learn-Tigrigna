
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, Calculator, RotateCcw } from 'lucide-react';

const tigrignaNumbers = [
  { number: 1, tigrigna: 'ሓደ', pronunciation: 'hade', feminine: 'ሓንቲ', femininePronounciation: 'hanti' },
  { number: 2, tigrigna: 'ክልተ', pronunciation: 'kilte', feminine: 'ክልተ', femininePronounciation: 'kilte' },
  { number: 3, tigrigna: 'ሰለስተ', pronunciation: 'seleste', feminine: 'ሰለስተ', femininePronounciation: 'seleste' },
  { number: 4, tigrigna: 'ኣርባዕተ', pronunciation: 'arbate', feminine: 'ኣርባዕተ', femininePronounciation: 'arbate' },
  { number: 5, tigrigna: 'ሓሙሽተ', pronunciation: 'hamushte', feminine: 'ሓሙሽተ', femininePronounciation: 'hamushte' },
  { number: 6, tigrigna: 'ሽድሽተ', pronunciation: 'shidishte', feminine: 'ሽድሽተ', femininePronounciation: 'shidishte' },
  { number: 7, tigrigna: 'ሸውዐተ', pronunciation: 'shewate', feminine: 'ሸውዐተ', femininePronounciation: 'shewate' },
  { number: 8, tigrigna: 'ሸሞንተ', pronunciation: 'shemonte', feminine: 'ሸሞንተ', femininePronounciation: 'shemonte' },
  { number: 9, tigrigna: 'ትሽዐተ', pronunciation: 'tishate', feminine: 'ትሽዐተ', femininePronounciation: 'tishate' },
  { number: 10, tigrigna: 'ዓስርተ', pronunciation: 'aserte', feminine: 'ዓስርተ', femininePronounciation: 'aserte' },
  { number: 11, tigrigna: 'ዓስርተ ሓደ', pronunciation: 'aserte hade', feminine: 'ዓስርተ ሓንቲ', femininePronounciation: 'aserte hanti' },
  { number: 12, tigrigna: 'ዓስርተ ክልተ', pronunciation: 'aserte kilte', feminine: 'ዓስርተ ክልተ', femininePronounciation: 'aserte kilte' },
  { number: 15, tigrigna: 'ዓስርተ ሓሙሽተ', pronunciation: 'aserte hamushte', feminine: 'ዓስርተ ሓሙሽተ', femininePronounciation: 'aserte hamushte' },
  { number: 20, tigrigna: 'ዕስራ', pronunciation: 'isra', feminine: 'ዕስራ', femininePronounciation: 'isra' },
  { number: 30, tigrigna: 'ሰላሳ', pronunciation: 'selasa', feminine: 'ሰላሳ', femininePronounciation: 'selasa' },
  { number: 40, tigrigna: 'ኣርብዓ', pronunciation: 'arba', feminine: 'ኣርብዓ', femininePronounciation: 'arba' },
  { number: 50, tigrigna: 'ሓምሳ', pronunciation: 'hamsa', feminine: 'ሓምሳ', femininePronounciation: 'hamsa' },
  { number: 100, tigrigna: 'ሚእቲ', pronunciation: 'mieti', feminine: 'ሚእቲ', femininePronounciation: 'mieti' },
  { number: 1000, tigrigna: 'ሽሕ', pronunciation: 'shih', feminine: 'ሽሕ', femininePronounciation: 'shih' }
];

const mathExamples = [
  { question: 'ሓደ + ክልተ = ?', answer: 'ሰለስተ', calculation: '1 + 2 = 3' },
  { question: 'ሓሙሽተ - ሰለስተ = ?', answer: 'ክልተ', calculation: '5 - 3 = 2' },
  { question: 'ሽድሽተ ÷ ክልተ = ?', answer: 'ሰለስተ', calculation: '6 ÷ 2 = 3' },
  { question: 'ክልተ × ኣርባዕተ = ?', answer: 'ሸሞንተ', calculation: '2 × 4 = 8' }
];

const NumbersSection = () => {
  const [selectedNumber, setSelectedNumber] = useState<typeof tigrignaNumbers[0] | null>(null);
  const [showFeminine, setShowFeminine] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [showQuizAnswer, setShowQuizAnswer] = useState(false);

  const playPronunciation = (pronunciation: string) => {
    console.log(`Playing pronunciation for ${pronunciation}`);
    // Placeholder for ElevenLabs integration
  };

  const nextQuizQuestion = () => {
    setCurrentQuizIndex((prev) => 
      prev < mathExamples.length - 1 ? prev + 1 : 0
    );
    setShowQuizAnswer(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Numbers in Tigrigna</h2>
        <p className="text-gray-600 mb-6">Learn to count and do basic arithmetic</p>
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            variant={!quizMode ? 'default' : 'outline'}
            onClick={() => setQuizMode(false)}
          >
            <Calculator className="w-4 h-4 mr-2" />
            Learn Numbers
          </Button>
          <Button
            variant={quizMode ? 'default' : 'outline'}
            onClick={() => setQuizMode(true)}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Math Practice
          </Button>
        </div>
      </div>

      {!quizMode ? (
        <>
          {/* Gender Toggle */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-center space-x-4">
                <span className="text-sm font-medium">Number Form:</span>
                <Button
                  variant={!showFeminine ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowFeminine(false)}
                >
                  Masculine
                </Button>
                <Button
                  variant={showFeminine ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowFeminine(true)}
                >
                  Feminine
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Numbers Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tigrignaNumbers.map((numberObj, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedNumber?.number === numberObj.number ? 'ring-2 ring-teal-500 bg-teal-50' : ''
                }`}
                onClick={() => setSelectedNumber(numberObj)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold mb-2 text-orange-600">{numberObj.number}</div>
                  <div className="text-xl font-semibold mb-2 text-gray-800">
                    {showFeminine ? numberObj.feminine : numberObj.tigrigna}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    [{showFeminine ? numberObj.femininePronounciation : numberObj.pronunciation}]
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      playPronunciation(showFeminine ? numberObj.femininePronounciation : numberObj.pronunciation);
                    }}
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Number Details */}
          {selectedNumber && (
            <Card className="bg-gradient-to-r from-orange-50 to-teal-50 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-4xl">{selectedNumber.number}</span>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => playPronunciation(selectedNumber.pronunciation)}
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Masculine
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => playPronunciation(selectedNumber.femininePronounciation)}
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Feminine
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Masculine Form</h4>
                    <p className="text-2xl font-bold text-teal-700">{selectedNumber.tigrigna}</p>
                    <p className="text-gray-600">[{selectedNumber.pronunciation}]</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Feminine Form</h4>
                    <p className="text-2xl font-bold text-orange-700">{selectedNumber.feminine}</p>
                    <p className="text-gray-600">[{selectedNumber.femininePronounciation}]</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        /* Math Quiz Mode */
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-between">
              <Badge variant="outline">
                Question {currentQuizIndex + 1} of {mathExamples.length}
              </Badge>
              <Badge variant="secondary">Math Practice</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-4xl font-bold text-purple-700 mb-4">
              {mathExamples[currentQuizIndex].question}
            </div>
            
            <div className="text-sm text-gray-600">
              {mathExamples[currentQuizIndex].calculation}
            </div>

            {!showQuizAnswer ? (
              <Button onClick={() => setShowQuizAnswer(true)} size="lg">
                Show Answer
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="text-3xl font-bold text-green-700">
                  {mathExamples[currentQuizIndex].answer}
                </div>
                <Button onClick={nextQuizQuestion}>
                  Next Question
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Learning Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-800 mb-2">🔢 Number Tips</h3>
        <div className="text-blue-700 space-y-2">
          <p>• Tigrigna numbers have masculine and feminine forms, similar to other Semitic languages.</p>
          <p>• Numbers 1-10 are essential building blocks for larger numbers.</p>
          <p>• Practice counting objects around you to reinforce number recognition.</p>
        </div>
      </div>
    </div>
  );
};

export default NumbersSection;
