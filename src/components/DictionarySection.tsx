import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Volume2, BookOpen, Star } from 'lucide-react';
import { playPronunciation } from '@/services/audioService';

const dictionaryData = [
  { tigrigna: 'ሰላም', english: 'peace, hello', pronunciation: 'selam', category: 'greetings' },
  { tigrigna: 'እንቋዕ', english: 'congratulations', pronunciation: 'enquae', category: 'greetings' },
  { tigrigna: 'ጽቡቕ', english: 'good, fine', pronunciation: 'tsbuq', category: 'adjectives' },
  { tigrigna: 'ሓደ', english: 'one', pronunciation: 'hade', category: 'numbers' },
  { tigrigna: 'ክልተ', english: 'two', pronunciation: 'kilte', category: 'numbers' },
  { tigrigna: 'ሰለስተ', english: 'three', pronunciation: 'seleste', category: 'numbers' },
  { tigrigna: 'ዓርቢ', english: 'four', pronunciation: 'arbi', category: 'numbers' },
  { tigrigna: 'ሓሙሽተ', english: 'five', pronunciation: 'hamushte', category: 'numbers' },
  { tigrigna: 'ማይ', english: 'water', pronunciation: 'may', category: 'nouns' },
  { tigrigna: 'እንጀራ', english: 'injera (traditional bread)', pronunciation: 'enjera', category: 'food' },
  { tigrigna: 'ቤት', english: 'house', pronunciation: 'bet', category: 'nouns' },
  { tigrigna: 'ኣደ', english: 'mother', pronunciation: 'ade', category: 'family' },
  { tigrigna: 'ኣቦ', english: 'father', pronunciation: 'abo', category: 'family' },
  { tigrigna: 'ወዲ', english: 'boy, son', pronunciation: 'wedi', category: 'family' },
  { tigrigna: 'ጓል', english: 'girl, daughter', pronunciation: 'gual', category: 'family' },
  { tigrigna: 'መጽሓፍ', english: 'book', pronunciation: 'meshaf', category: 'objects' },
  { tigrigna: 'ጸሓይ', english: 'sun', pronunciation: 'tsehay', category: 'nature' },
  { tigrigna: 'ቀትሪ', english: 'day', pronunciation: 'qetri', category: 'time' },
  { tigrigna: 'ለይቲ', english: 'night', pronunciation: 'leyti', category: 'time' },
  { tigrigna: 'ንኡስ', english: 'small', pronunciation: 'nius', category: 'adjectives' },
  { tigrigna: 'ዓቢ', english: 'big', pronunciation: 'abi', category: 'adjectives' },
  { tigrigna: 'ጽቡቕ', english: 'beautiful, good', pronunciation: 'tsbuq', category: 'adjectives' },
  { tigrigna: 'ረሳሕ', english: 'ugly, bad', pronunciation: 'resah', category: 'adjectives' },
  { tigrigna: 'ሓይሊ', english: 'strength, power', pronunciation: 'hayli', category: 'abstract' },
  { tigrigna: 'ፍቕሪ', english: 'love', pronunciation: 'fiqri', category: 'emotions' }
];

const categories = ['all', 'greetings', 'numbers', 'family', 'food', 'nouns', 'adjectives', 'time', 'nature', 'objects', 'emotions', 'abstract'];

const DictionarySection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchLanguage, setSearchLanguage] = useState<'english' | 'tigrigna'>('english');
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredWords = dictionaryData.filter(word => {
    const matchesCategory = selectedCategory === 'all' || word.category === selectedCategory;
    const searchLower = searchTerm.toLowerCase();
    
    if (searchLanguage === 'english') {
      return matchesCategory && word.english.toLowerCase().includes(searchLower);
    } else {
      return matchesCategory && word.tigrigna.includes(searchTerm);
    }
  });

  const toggleFavorite = (word: string) => {
    setFavorites(prev => 
      prev.includes(word) 
        ? prev.filter(w => w !== word)
        : [...prev, word]
    );
  };

  const handlePlayPronunciation = async (word: any) => {
    await playPronunciation(word.tigrigna, word.pronunciation);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Dictionary</h2>
        <p className="text-gray-600 mb-6">English ↔ Tigrigna Translation</p>
      </div>

      {/* Search Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Search Dictionary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder={searchLanguage === 'english' ? 'Search in English...' : 'Search in Tigrigna...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-lg"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant={searchLanguage === 'english' ? 'default' : 'outline'}
                onClick={() => setSearchLanguage('english')}
              >
                English
              </Button>
              <Button
                variant={searchLanguage === 'tigrigna' ? 'default' : 'outline'}
                onClick={() => setSearchLanguage('tigrigna')}
              >
                ትግርኛ
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className="cursor-pointer capitalize"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            Results ({filteredWords.length})
          </h3>
          <Badge variant="secondary">
            <BookOpen className="w-4 h-4 mr-1" />
            {dictionaryData.length} total words
          </Badge>
        </div>

        <div className="grid gap-4">
          {filteredWords.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">No words found matching your search.</p>
              </CardContent>
            </Card>
          ) : (
            filteredWords.map((word, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <div className="text-2xl font-bold text-teal-700">
                          {word.tigrigna}
                        </div>
                        <div className="text-lg text-gray-700">
                          {word.english}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          [{word.pronunciation}]
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {word.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePlayPronunciation(word)}
                      >
                        <Volume2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(word.tigrigna)}
                        className={favorites.includes(word.tigrigna) ? 'text-yellow-500' : ''}
                      >
                        <Star className={`w-4 h-4 ${favorites.includes(word.tigrigna) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Usage Tip */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-800 mb-2">📚 Dictionary Tip</h3>
        <p className="text-blue-700">
          Click the star icon to save words to your personal vocabulary list for later practice. 
          Use the pronunciation guide in brackets to help with speaking.
        </p>
      </div>
    </div>
  );
};

export default DictionarySection;
