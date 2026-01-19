
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Volume2, Search, Trophy, Calculator, Users } from 'lucide-react';
import AlphabetSection from '@/components/AlphabetSection';
import DictionarySection from '@/components/DictionarySection';
import VocabularyBuilder from '@/components/VocabularyBuilder';
import NumbersSection from '@/components/NumbersSection';
import QuizSection from '@/components/QuizSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [userProgress, setUserProgress] = useState(25);

  const menuItems = [
    { id: 'alphabet', label: 'Alphabet', icon: BookOpen, description: 'Learn the Geʽez script' },
    { id: 'dictionary', label: 'Dictionary', icon: Search, description: 'English ↔ Tigrigna lookup' },
    { id: 'vocabulary', label: 'Vocabulary', icon: Users, description: 'Build your word bank' },
    { id: 'numbers', label: 'Numbers', icon: Calculator, description: 'Count in Tigrigna' },
    { id: 'quiz', label: 'Quiz', icon: Trophy, description: 'Test your knowledge' },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'alphabet':
        return <AlphabetSection />;
      case 'dictionary':
        return <DictionarySection />;
      case 'vocabulary':
        return <VocabularyBuilder />;
      case 'numbers':
        return <NumbersSection />;
      case 'quiz':
        return <QuizSection />;
      default:
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center py-8 bg-gradient-to-br from-orange-50 to-teal-50 rounded-2xl border">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                ሰላም! Welcome to Tigrigna
              </h1>
              <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                Master the beautiful Tigrigna language with interactive lessons, pronunciation guides, and cultural insights
              </p>
              <Badge variant="secondary" className="text-sm px-4 py-2">
                {userProgress}% Complete
              </Badge>
              <Progress value={userProgress} className="w-64 mx-auto mt-4" />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-teal-600">32</div>
                  <div className="text-sm text-gray-600">Letters Learned</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600">147</div>
                  <div className="text-sm text-gray-600">Words Mastered</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600">8</div>
                  <div className="text-sm text-gray-600">Quizzes Passed</div>
                </CardContent>
              </Card>
            </div>

            {/* Learning Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <Card 
                  key={item.id} 
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => setActiveSection(item.id)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-br from-teal-500 to-orange-500 rounded-xl text-white group-hover:scale-110 transition-transform">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{item.label}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Cultural Insight Card */}
            <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>🇪🇷</span>
                  <span>Cultural Insight</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Tigrigna (ትግርኛ) is spoken by over 7 million people in Eritrea and northern Ethiopia. 
                  The Geʽez script has been used for over 1,500 years and is one of the world's oldest writing systems still in use today.
                </p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50/30">
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant={activeSection === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('home')}
                className="text-lg font-semibold"
              >
                ትግርኛ Learn
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="hidden md:flex">
                Beginner Level
              </Badge>
              <Button variant="ghost" size="sm">
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderActiveSection()}
      </main>

      {/* Navigation */}
      {activeSection !== 'home' && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
          <Card className="p-2">
            <div className="flex space-x-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveSection(item.id)}
                  className="flex-col h-16 w-16"
                >
                  <item.icon className="h-4 w-4 mb-1" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
