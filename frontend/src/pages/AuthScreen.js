import { useState } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { STARTUP_PRESETS, getPresetLocalName } from '../lib/gameData';
import { useLanguage } from '../lib/LanguageContext';
import LanguagePicker from '../components/LanguagePicker';
import PasswordInput from '../components/PasswordInput';
import {
  Cherry, Coffee, Scissors, GraduationCap, Wheat,
  UtensilsCrossed, Lightbulb, ArrowRight, Sparkles, Mail, Lock,
} from 'lucide-react';

const ICON_MAP = { Cherry, Coffee, Scissors, GraduationCap, Wheat, UtensilsCrossed };
const API = `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001'}/api`;

export default function AuthScreen({ onAuth }) {
  const [tab, setTab] = useState('signup');
  const { lang, t } = useLanguage();

  // Sign-up fields
  const [name, setName] = useState('');
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [customIdea, setCustomIdea] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const passwordsMatch = confirmPassword === '' || password === confirmPassword;

  const missing = [
    !name.trim() && 'Name',
    !(selectedPreset || customIdea.trim()) && 'Startup idea',
    !email.trim() && 'Email',
    password.length < 6 && 'Password (min 6 chars)',
    password.length >= 6 && confirmPassword && password !== confirmPassword && 'Passwords must match',
  ].filter(Boolean);

  const canSignUp = missing.length === 0;

  const canLogin = loginEmail.trim() && loginPassword.trim();

  const handleSignUp = async () => {
    if (!canSignUp) return;
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(`${API}/auth/register`, {
        player_name: name.trim(),
        startup_idea: selectedPreset ? selectedPreset.name : customIdea.trim(),
        startup_type: selectedPreset ? selectedPreset.id : 'custom',
        email: email.trim().toLowerCase(),
        password,
      });
      onAuth(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!canLogin) return;
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(`${API}/auth/login`, {
        email: loginEmail.trim().toLowerCase(),
        password: loginPassword,
      });
      onAuth(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="start-screen">
      <div className="start-bg-pattern" />
      <div className="start-content">
        <LanguagePicker />

        <div className="start-header">
          <h1 className="start-title">Udyogverse</h1>
          <p className="start-subtitle">{t('startSubtitle')}</p>
          <p className="start-subtitle-hindi">{t('startSubtitleLocal')}</p>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${tab === 'signup' ? 'auth-tab-active' : ''}`}
            onClick={() => { setTab('signup'); setError(''); }}
          >
            {t('signupTab')}
          </button>
          <button
            className={`auth-tab ${tab === 'login' ? 'auth-tab-active' : ''}`}
            onClick={() => { setTab('login'); setError(''); }}
          >
            {t('loginTab')}
          </button>
        </div>

        {error && <div className="auth-error">{error}</div>}

        {tab === 'signup' ? (
          <>
            {/* Name */}
            <div className="start-section">
              <label className="start-label">
                <Sparkles size={14} className="inline mr-1" />
                {t('enterNameLabel')}
              </label>
              <Input
                placeholder={t('namePlaceholder')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="start-input"
                maxLength={20}
              />
            </div>

            {/* Startup idea */}
            <div className="start-section">
              <label className="start-label">
                <Lightbulb size={14} className="inline mr-1" />
                {t('chooseStartupLabel')}
              </label>
              <div className="preset-grid">
                {STARTUP_PRESETS.map((preset) => {
                  const Icon = ICON_MAP[preset.icon] || Lightbulb;
                  return (
                    <button
                      key={preset.id}
                      className={`preset-card ${selectedPreset?.id === preset.id ? 'preset-selected' : ''}`}
                      onClick={() => { setSelectedPreset(preset); setShowCustom(false); setCustomIdea(''); }}
                    >
                      <Icon size={24} className="preset-icon" />
                      <span className="preset-name">{preset.name}</span>
                      <span className="preset-hindi">{getPresetLocalName(preset, lang)}</span>
                    </button>
                  );
                })}
                <button
                  className={`preset-card ${showCustom ? 'preset-selected' : ''}`}
                  onClick={() => { setShowCustom(true); setSelectedPreset(null); }}
                >
                  <Lightbulb size={24} className="preset-icon" />
                  <span className="preset-name">{t('customIdeaName')}</span>
                  <span className="preset-hindi">{t('customIdeaLocal')}</span>
                </button>
              </div>
              {showCustom && (
                <Input
                  placeholder={t('customPlaceholder')}
                  value={customIdea}
                  onChange={(e) => setCustomIdea(e.target.value)}
                  className="start-input mt-3"
                  maxLength={40}
                />
              )}
            </div>

            {/* Email */}
            <div className="start-section">
              <label className="start-label">
                <Mail size={14} className="inline mr-1" />
                {t('emailLabel')}
              </label>
              <Input
                type="email"
                placeholder={t('emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="start-input"
              />
            </div>

            {/* Password */}
            <div className="start-section">
              <label className="start-label">
                <Lock size={14} className="inline mr-1" />
                {t('passwordLabel')} ({t('passwordHint')})
              </label>
              <PasswordInput
                placeholder={t('passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="start-input"
              />
            </div>

            {/* Confirm Password */}
            <div className="start-section">
              <label className="start-label">
                <Lock size={14} className="inline mr-1" />
                {t('confirmPasswordLabel')}
              </label>
              <PasswordInput
                placeholder={t('confirmPlaceholder')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`start-input ${!passwordsMatch ? 'input-error' : ''}`}
                onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
              />
              {!passwordsMatch && (
                <p className="auth-field-error">{t('passwordMismatch')}</p>
              )}
            </div>

            <Button
              className="start-button"
              size="lg"
              onClick={handleSignUp}
              disabled={!canSignUp || loading}
            >
              {loading ? t('creatingAccount') : t('createAccountBtn')}
              <ArrowRight size={20} className="ml-2" />
            </Button>

            {missing.length > 0 && (
              <div className="signup-missing">
                <span className="signup-missing-label">Still needed:</span>
                {missing.map((m) => (
                  <span key={m} className="signup-missing-item">{m}</span>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="start-section">
              <label className="start-label">
                <Mail size={14} className="inline mr-1" />
                {t('emailLabel')}
              </label>
              <Input
                type="email"
                placeholder={t('emailPlaceholder')}
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="start-input"
              />
            </div>

            <div className="start-section">
              <label className="start-label">
                <Lock size={14} className="inline mr-1" />
                {t('passwordLabel')}
              </label>
              <PasswordInput
                placeholder={t('loginPasswordPlaceholder')}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="start-input"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            <Button
              className="start-button"
              size="lg"
              onClick={handleLogin}
              disabled={!canLogin || loading}
            >
              {loading ? t('loggingIn') : t('loginBtn')}
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </>
        )}

        <p className="start-footer">{t('startFooter')}</p>
      </div>
    </div>
  );
}
