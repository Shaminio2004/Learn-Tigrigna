
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, BookOpen } from 'lucide-react';
import { playPronunciation } from '@/services/audioService';
import AudioSettings from './AudioSettings';

const tigrignaAlphabet = [
  { geez: 'ሀ', latin: 'hä', sound: 'ha', example: 'ሀበሻ (habesha)', meaning: 'Ethiopian/Eritrean' },
  { geez: 'ለ', latin: 'lə', sound: 'le', example: 'ልቢ (lebi)', meaning: 'heart' },
  { geez: 'ሐ', latin: 'ḥä', sound: 'ha', example: 'ሐሳብ (hasab)', meaning: 'thought' },
  { geez: 'መ', latin: 'mə', sound: 'me', example: 'መጽሓፍ (meshaf)', meaning: 'book' },
  { geez: 'ሠ', latin: 'śä', sound: 'se', example: 'ሠላሳ (selasa)', meaning: 'thirty' },
  { geez: 'ረ', latin: 'rə', sound: 're', example: 'ረድኤት (redet)', meaning: 'help' },
  { geez: 'ሰ', latin: 'sə', sound: 'se', example: 'ሰላም (selam)', meaning: 'peace' },
  { geez: 'ሸ', latin: 'šə', sound: 'she', example: 'ሸሓን (shehan)', meaning: 'fat' },
  { geez: 'ቀ', latin: 'qə', sound: 'qe', example: 'ቀዳም (qedam)', meaning: 'first' },
  { geez: 'በ', latin: 'bə', sound: 'be', example: 'በዓል (beal)', meaning: 'owner' },
  { geez: 'ተ', latin: 'tə', sound: 'te', example: 'ተወልዶ (teweldo)', meaning: 'born' },
  { geez: 'ቸ', latin: 'čə', sound: 'che', example: 'ቸርቂ (cherqi)', meaning: 'moon' },
  { geez: 'ኀ', latin: 'ḫä', sound: 'kha', example: 'ኀይሊ (khayli)', meaning: 'strength' },
  { geez: 'ነ', latin: 'nə', sound: 'ne', example: 'ነብሲ (nebsi)', meaning: 'soul' },
  { geez: 'ኘ', latin: 'ñə', sound: 'nye', example: 'ኘብዓት (nyebat)', meaning: 'to cry' },
  { geez: 'አ', latin: 'ʾä', sound: 'a', example: 'አንበሳ (anbesa)', meaning: 'lion' },
  { geez: 'ከ', latin: 'kə', sound: 'ke', example: 'ከብዲ (kebdi)', meaning: 'liver' },
  { geez: 'ኸ', latin: 'ḵə', sound: 'khe', example: 'ኸሪት (kherit)', meaning: 'autumn' },
  { geez: 'ወ', latin: 'wə', sound: 'we', example: 'ወዲ (wedi)', meaning: 'boy' },
  { geez: 'ዘ', latin: 'zə', sound: 'ze', example: 'ዘይተረፈ (zeytereffe)', meaning: 'nothing left' },
  { geez: 'ዠ', latin: 'žə', sound: 'zhe', example: 'ዠንጋ (zhenga)', meaning: 'bell' },
  { geez: 'የ', latin: 'yə', sound: 'ye', example: 'የሓጉስ (yehagus)', meaning: 'happy' },
  { geez: 'ደ', latin: 'də', sound: 'de', example: 'ደቂ (deqi)', meaning: 'children' },
  { geez: 'ጀ', latin: 'ǧə', sound: 'je', example: 'ጀሚሩ (jemiru)', meaning: 'started' },
  { geez: 'ገ', latin: 'gə', sound: 'ge', example: 'ገዛ (geza)', meaning: 'house' },
  { geez: 'ጠ', latin: 'ṭə', sound: 'te', example: 'ጠቢብ (tebib)', meaning: 'wise' },
  { geez: 'ጨ', latin: 'č̣ə', sound: 'che', example: 'ጨረቃ (chereqa)', meaning: 'moon' },
  { geez: 'ጰ', latin: 'p̣ə', sound: 'pe', example: 'ጰጣውያን (petawiyan)', meaning: 'apostles' },
  { geez: 'ጸ', latin: 'ṣə', sound: 'tse', example: 'ጸሓይ (tsehay)', meaning: 'sun' },
  { geez: 'ፀ', latin: 'ṣ́ə', sound: 'tse', example: 'ፀሓይቲ (tsehayyti)', meaning: 'sunny' },
  { geez: 'ፈ', latin: 'fə', sound: 'fe', example: 'ፈረስ (feres)', meaning: 'horse' },
  { geez: 'ፐ', latin: 'pə', sound: 'pe', example: 'ፓስታ (pasta)', meaning: 'pasta' }
];

const AlphabetSection = () => {
  const [selectedLetter, setSelectedLetter] = useState<typeof tigrignaAlphabet[0] | null>(null);

  const handlePlayPronunciation = async (letter: any) => {
    await playPronunciation(letter.geez, letter.sound);
  };

  return (
    <div className="space-y-6">
      <AudioSettings />
      
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Tigrigna Alphabet</h2>
        <p className="text-gray-600 mb-6">Learn the 32 letters of the Geʽez script</p>
        <Badge variant="secondary" className="mb-4">
          <BookOpen className="w-4 h-4 mr-2" />
          32 Letters Total
        </Badge>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {tigrignaAlphabet.map((letter, index) => (
          <Card 
            key={index}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedLetter?.geez === letter.geez ? 'ring-2 ring-teal-500 bg-teal-50' : ''
            }`}
            onClick={() => setSelectedLetter(letter)}
          >
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold mb-2 text-gray-800">{letter.geez}</div>
              <div className="text-sm text-gray-600">{letter.latin}</div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  playPronunciation(letter.sound);
                }}
              >
                <Volume2 className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedLetter && (
        <Card className="mt-8 bg-gradient-to-r from-teal-50 to-orange-50 border-teal-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-4xl">{selectedLetter.geez}</span>
              <Button
                variant="outline"
                onClick={() => handlePlayPronunciation(selectedLetter)}
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Listen
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Pronunciation</h4>
                <p className="text-lg"><strong>Romanized:</strong> {selectedLetter.latin}</p>
                <p className="text-lg"><strong>Sounds like:</strong> {selectedLetter.sound}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Example Word</h4>
                <p className="text-lg">{selectedLetter.example}</p>
                <p className="text-gray-600">{selectedLetter.meaning}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h3 className="font-semibold text-amber-800 mb-2">💡 Learning Tip</h3>
        <p className="text-amber-700">
          The Geʽez script is syllabic - each character represents a consonant-vowel combination. 
          Start with the basic forms (ሀ, ለ, መ...) then learn the vowel variations for each consonant.
        </p>
      </div>
    </div>
  );
};

export default AlphabetSection;
