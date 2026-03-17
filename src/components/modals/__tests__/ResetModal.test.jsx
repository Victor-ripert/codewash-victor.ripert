import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n/index.js';
import ResetModal from '../ResetModal.jsx';

const renderModal = (props = {}) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <ResetModal
        isOpen
        onClose={props.onClose || vi.fn()}
        onConfirm={props.onConfirm || vi.fn()}
      />
    </I18nextProvider>
  );
};

describe('ResetModal', () => {
  it('blocks confirm until correct word is entered', () => {
    const onConfirm = vi.fn();
    renderModal({ onConfirm });

    const submit = screen.getByRole('button', { name: /delete/i });
    expect(submit).toBeDisabled();

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'WRONG' } });
    fireEvent.submit(submit);
    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.getByText(/Please type DELETE to confirm/i)).toBeInTheDocument();
  });

  it('calls onConfirm when DELETE is typed', () => {
    const onConfirm = vi.fn();
    renderModal({ onConfirm });

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'DELETE' } });
    const submit = screen.getByRole('button', { name: /delete/i });
    expect(submit).not.toBeDisabled();

    fireEvent.submit(submit);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
