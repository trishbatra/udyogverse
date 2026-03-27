import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { STARTUP_PRESETS } from '../lib/gameData';
import {
  Cherry, Coffee, Scissors, GraduationCap, Wheat,
  UtensilsCrossed, Lightbulb, ArrowRight, Sparkles
} from 'lucide-react';

const ICON_MAP = {
  Cherry, Coffee, Scissors, GraduationCap, Wheat, UtensilsCrossed,
};

export default function StartScreen({ onStart }) {
  const [playerName, setPlayerName] = useState('');
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [customIdea, setCustomIdea] = useState('');
  const [showCustom, setShowCustom] = useState(false);

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
      {/* Background pattern overlay */}
      <div className="start-bg-pattern" />

      <div className="start-content">
        {/* Header */}
        <div className="start-header">
          <h1 className="start-title" data-testid="app-title">Udyogverse</h1>
          <p className="start-subtitle">Learn business by playing</p>
          <p className="start-subtitle-hindi">खेल खेल में बिज़नेस सीखो</p>
        </div>

        {/* Player Name */}
        <div className="start-section">
          <label className="start-label">
            <Sparkles size={14} className="inline mr-1" />
            Apna naam batao (Your Name)
          </label>
          <Input
            data-testid="player-name-input"
            placeholder="Enter your name..."
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
            Apna idea chuno (Choose your startup)
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
                  <span className="preset-hindi">{preset.nameHindi}</span>
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
              <span className="preset-name">Custom Idea</span>
              <span className="preset-hindi">अपना आइडिया</span>
            </button>
          </div>

          {showCustom && (
            <Input
              data-testid="custom-idea-input"
              placeholder="Describe your startup idea..."
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
                : `Custom startup: "${customIdea}"`}
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
          Shuruaat Karo
          <ArrowRight size={20} className="ml-2" />
        </Button>

        <p className="start-footer">
          Roll the dice. Build your empire. Become a Safal Udyami!
        </p>
      </div>
    </div>
  );
}
