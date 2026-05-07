import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { STARTUP_PRESETS, getPresetLocalName } from '../lib/gameData';
import { useLanguage } from '../lib/LanguageContext';
import LanguagePicker from '../components/LanguagePicker';
import {
  Cherry, Coffee, Scissors, GraduationCap, Wheat,
  UtensilsCrossed, Lightbulb, ArrowRight, Sparkles
} from 'lucide-react';

const ICON_MAP = {
  Cherry, Coffee, Scissors, GraduationCap, Wheat, UtensilsCrossed,
};

export default function StartScreen({ onStart, prefillData }) {
  const [playerName, setPlayerName] = useState(prefillData?.player_name || '');
  const [selectedPreset, setSelectedPreset] = useState(() => {
    if (prefillData?.startup_type && prefillData.startup_type !== 'custom') {
      return STARTUP_PRESETS.find((p) => p.id === prefillData.startup_type) || null;
    }
    return null;
  });
  const [customIdea, setCustomIdea] = useState(
    prefillData?.startup_type === 'custom' ? prefillData.startup_idea : ''
  );
  const [showCustom, setShowCustom] = useState(prefillData?.startup_type === 'custom');
  const { lang, t } = useLanguage();

  const canStart = playerName.trim() && (selectedPreset || customIdea.trim());

  const handleStart = () => {
    if (!canStart) return;
    onStart({
      playerName: playerName.trim(),
      startupIdea: selectedPreset ? selectedPreset.name : customIdea.trim(),
      startupType: selectedPreset ? selectedPreset.id : 'custom',
    });
  };

  return (
    <div className="start-screen" data-testid="start-screen">
      <div className="start-bg-pattern" />

      <div className="start-content">
        <LanguagePicker />

        {/* Header */}
        <div className="start-header">
          <h1 className="start-title" data-testid="app-title">Udyogverse</h1>
          <p className="start-subtitle">{t('startSubtitle')}</p>
          <p className="start-subtitle-hindi">{t('startSubtitleLocal')}</p>
        </div>

        {/* Player Name */}
        <div className="start-section">
          <label className="start-label">
            <Sparkles size={14} className="inline mr-1" />
            {t('enterNameLabel')}
          </label>
          <Input
            data-testid="player-name-input"
            placeholder={t('namePlaceholder')}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="start-input"
            maxLength={20}
          />
        </div>

        {/* Startup Selection */}
        <div className="start-section">
          <label className="start-label">
            <Lightbulb size={14} className="inline mr-1" />
            {t('chooseStartupLabel')}
          </label>

          <div className="preset-grid" data-testid="startup-presets">
            {STARTUP_PRESETS.map((preset) => {
              const Icon = ICON_MAP[preset.icon] || Lightbulb;
              const isSelected = selectedPreset?.id === preset.id;
              return (
                <button
                  key={preset.id}
                  data-testid={`preset-${preset.id}`}
                  className={`preset-card ${isSelected ? 'preset-selected' : ''}`}
                  onClick={() => {
                    setSelectedPreset(preset);
                    setShowCustom(false);
                    setCustomIdea('');
                  }}
                >
                  <Icon size={24} className="preset-icon" />
                  <span className="preset-name">{preset.name}</span>
                  <span className="preset-hindi">{getPresetLocalName(preset, lang)}</span>
                </button>
              );
            })}

            {/* Custom idea option */}
            <button
              data-testid="preset-custom"
              className={`preset-card ${showCustom ? 'preset-selected' : ''}`}
              onClick={() => {
                setShowCustom(true);
                setSelectedPreset(null);
              }}
            >
              <Lightbulb size={24} className="preset-icon" />
              <span className="preset-name">{t('customIdeaName')}</span>
              <span className="preset-hindi">{t('customIdeaLocal')}</span>
            </button>
          </div>

          {showCustom && (
            <Input
              data-testid="custom-idea-input"
              placeholder={t('customPlaceholder')}
              value={customIdea}
              onChange={(e) => setCustomIdea(e.target.value)}
              className="start-input mt-3"
              maxLength={40}
            />
          )}
        </div>

        {/* Selected summary */}
        {(selectedPreset || customIdea) && (
          <div className="start-summary" data-testid="start-summary">
            <p className="text-sm text-[#7F8C8D]">
              {selectedPreset
                ? selectedPreset.description
                : `${t('customSummaryPrefix')}: "${customIdea}"`}
            </p>
          </div>
        )}

        {/* Start Button */}
        <Button
          data-testid="start-game-button"
          className="start-button"
          size="lg"
          onClick={handleStart}
          disabled={!canStart}
        >
          {t('startButton')}
          <ArrowRight size={20} className="ml-2" />
        </Button>

        <p className="start-footer">
          {t('startFooter')}
        </p>
      </div>
    </div>
  );
}
