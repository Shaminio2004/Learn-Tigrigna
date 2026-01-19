
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Star, Volume2, RotateCcw, CheckCircle } from 'lucide-react';

const vocabularyCategories = {
  basics: {
    name: 'Basic Phrases',
    words: [
      { tigrigna: 'ሰላም', english: 'hello/peace', pronunciation: 'selam', learned: true },
      { tigrigna: 'እንቋዕ', english: 'congratulations', pronunciation: 'enquae', learned: true },
      { tigrigna: 'ይቀንየለይ', english: 'thank you', pronunciation: 'yiqenyeleley', learned: false },
      { tigrigna: 'ይቅረታ', english: 'excuse me/sorry', pronunciation: 'yiqreta', learned: false },
      { tigrigna: 'ብሰላም', english: 'goodbye', pronunciation: 'bselam', learned: false }
    ]
  },
  family: {
    name: 'Family & People',
    words: [
      { tigrigna: 'ኣደ', english: 'mother', pronunciation: 'ade', learned: true },
      { tigrigna: 'ኣቦ', english: 'father', pronunciation: 'abo', learned: true },
      { tigrigna: 'ወዲ', english: 'boy/son', pronunciation: 'wedi', learned: false },
      { tigrigna: 'ጓል', english: 'girl/daughter', pronunciation: 'gual', learned: false },
      { tigrigna: 'ወዲ ሓው', english: 'brother', pronunciation: 'wedi haw', learned: false }
    ]
  },
  food: {
    name: 'Food & Drink',
    words: [
      { tigrigna: 'እንጀራ', english: 'injera', pronunciation: 'enjera', learned: true },
      { tigrigna: 'ማይ', english: 'water', pronunciation: 'may', learned: true },
      { tigrigna: 'ሻሂ', english: 'tea', pronunciation: 'shahi', learned: false },
      { tigrigna: 'ቡን', english: 'coffee', pronunciation: 'bun', learned: false },
      { tigrigna: 'ቅጽብጽባ', english: 'vegetables', pronunciation: 'qitsibitisiba', learned: false }
    ]
  },
  nature: {
    name: 'Nature & Weather',
    words: [
      { tigrigna: 'ጸሓይ', english: 'sun', pronunciation: 'tsehay', learned: false },
      { tigrigna: 'ቀትሪ', english: 'day', pronunciation: 'qetri', learned: false },
      { tigrigna: 'ለይቲ', english: 'night', pronunciation: 'leyti', learned: false },
      { tigrigna: 'ዝናብ', english: 'rain', pronunciation: 'zinab', learned: false },
      { tigrigna: 'ንፋስ', english: 'wind', pronunciation: 'nifas', learned: false }
    ]
  }
};

const VocabularyBuilder = () => {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof vocabularyCategories>('basics');
  const [studyMode, setStudyMode] = useState<'learn' | 'review' | 'test'>('learn');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentCategory = vocabularyCategories[selectedCategory];
  const currentWord = currentCategory.words[currentWordIndex];
  const learnedCount = currentCategory.words.filter(w => w.learned).length;
  const progress = (learnedCount / currentCategory.words.length) * 100;

  const nextWord = () => {
    setCurrentWordIndex((prev) => 
      prev < currentCategory.words.length - 1 ? prev + 1 : 0
    );
    setShowAnswer(false);
  };

  const markAsLearned = () => {
    const updatedWords = [...currentCategory.words];
    updatedWords[currentWordIndex].learned = true;
    // In a real app, this would update state management or database
    console.log(`Marked ${currentWord.tigrigna} as learned`);
  };

  const playPronunciation = (pronunciation: string) => {
    console.log(`Playing pronunciation for ${pronunciation}`);
    // Placeholder for ElevenLabs integration
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Vocabulary Builder</h2>
        <p className="text-gray-600 mb-6">Build your Tigrigna vocabulary systematically</p>
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(vocabularyCategories).map(([key, category]) => {
          const learned = category.words.filter(w => w.learned).length;
          const total = category.words.length;
          const categoryProgress = (learned / total) * 100;
          
          return (
            <Card 
              key={key}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedCategory === key ? 'ring-2 ring-teal-500 bg-teal-50' : ''
              }`}
              onClick={() => {
                setSelectedCategory(key as keyof typeof vocabularyCategories);
                setCurrentWordIndex(0);
                setShowAnswer(false);
              }}
            >
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <div className="space-y-2">
                  <Progress value={categoryProgress} className="h-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{learned}/{total} learned</span>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(categoryProgress)}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Study Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Study Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button
              variant={studyMode === 'learn' ? 'default' : 'outline'}
              onClick={() => setStudyMode('learn')}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Learn New
            </Button>
            <Button
              variant={studyMode === 'review' ? 'default' : 'outline'}
              onClick={() => setStudyMode('review')}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Review
            </Button>
            <Button
              variant={studyMode === 'test' ? 'default' : 'outline'}
              onClick={() => setStudyMode('test')}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Test Mode
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Study Card */}
      <Card className="bg-gradient-to-br from-teal-50 to-orange-50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-between">
            <Badge variant="outline">
              {currentWordIndex + 1} of {currentCategory.words.length}
            </Badge>
            <Badge variant={currentWord.learned ? 'default' : 'secondary'}>
              {currentWord.learned ? 'Learned' : 'New'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl font-bold text-teal-700 mb-4">
            {currentWord.tigrigna}
          </div>
          
          <div className="space-y-2">
            <Button
              variant="outline"
              onClick={() => playPronunciation(currentWord.pronunciation)}
              className="text-lg"
            >
              <Volume2 className="w-5 h-5 mr-2" />
              [{currentWord.pronunciation}]
            </Button>
          </div>

          {studyMode === 'test' && !showAnswer ? (
            <div className="space-y-4">
              <p className="text-lg text-gray-600">What does this word mean?</p>
              <Button onClick={() => setShowAnswer(true)}>
                Show Answer
              </Button>
            </div>
          ) : (
            <div className="text-2xl font-semibold text-gray-800">
              {currentWord.english}
            </div>
          )}

          <div className="flex justify-center space-x-4 pt-4">
            <Button variant="outline" onClick={nextWord}>
              Next Word
            </Button>
            {!currentWord.learned && (
              <Button onClick={markAsLearned}>
                <Star className="w-4 h-4 mr-2" />
                Mark as Learned
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Your Progress in {currentCategory.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Overall Progress</span>
              <span className="font-semibold">{learnedCount}/{currentCategory.words.length} words</span>
            </div>
            <Progress value={progress} className="h-3" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-green-700">✓ Learned Words</h4>
                {currentCategory.words.filter(w => w.learned).map((word, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{word.tigrigna}</span>
                    <span className="text-gray-600">{word.english}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-orange-700">📚 To Learn</h4>
                {currentCategory.words.filter(w => !w.learned).map((word, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{word.tigrigna}</span>
                    <span className="text-gray-600">{word.english}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="font-semibold text-green-800 mb-2">🎯 Study Tip</h3>
        <p className="text-green-700">
          Practice a little every day! Try to learn 3-5 new words daily and review previously learned words regularly. 
          Use the pronunciation feature to improve your speaking skills.
        </p>
      </div>
    </div>
  );
};

export default VocabularyBuilder;
