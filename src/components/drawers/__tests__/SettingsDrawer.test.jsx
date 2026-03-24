import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n/index.js';
import SettingsDrawer from '../SettingsDrawer.jsx';

vi.mock('../../profile/ProfileCard', () => ({
  default: ({ id }) => <div data-testid={`profile-card-${id}`}>Profile {id}</div>,
}));

const defaultProps = {
  isOpen: true,
  onReset: vi.fn(),
  bgmVol: 0.3,
  setBgmVol: vi.fn(),
  sfxVol: 0.4,
  setSfxVol: vi.fn(),
  currentProfile: 1,
  onSwitchProfile: vi.fn(),
  profileNames: { 1: 'Player 1', 2: 'Player 2', 3: 'Player 3' },
  onRenameProfile: vi.fn(),
  getProfileStats: vi.fn(() => ({ totalLevel: 1 })),
  parentStatus: {},
  onParentVerified: vi.fn(),
  currentSkills: {},
};

const renderDrawer = (props = {}) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <SettingsDrawer {...defaultProps} {...props} />
    </I18nextProvider>
  );
};

describe('SettingsDrawer language switch', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('switches settings text between English and Spanish', async () => {
    renderDrawer();

    expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument();
    expect(screen.getByText('Audio Configuration')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Spanish' }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /opciones/i })).toBeInTheDocument();
    });
    expect(screen.getByText('Configuración de Audio')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Inglés' }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument();
    });
    expect(screen.getByText('Audio Configuration')).toBeInTheDocument();
  });
});
