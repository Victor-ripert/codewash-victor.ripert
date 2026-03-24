import { test, expect, type Locator, type Page } from '@playwright/test';

const closeOverlayIfPresent = async (page: Page, overlay: Locator) => {
  if (await overlay.count() === 0) return;
  try {
    await overlay.first().click({ timeout: 1500, trial: true });
    await overlay.first().click({ timeout: 1500 });
    return;
  } catch {
    await page.keyboard.press('Escape');
  }
};

const closeAllOverlays = async (page: Page) => {
  // Try a few times in case multiple overlays stack
  for (let i = 0; i < 3; i += 1) {
    const overlay = page.locator('div.fixed.inset-0');
    const count = await overlay.count();
    if (count === 0) break;
    await closeOverlayIfPresent(page, overlay);
  }
};

const clickThroughOverlay = async (locator: Locator) => {
  try {
    await locator.click({ timeout: 2000 });
  } catch {
    await locator.click({ timeout: 1000, force: true });
  }
};

test('key UI text remains stable', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Settings drawer (top-left button)
  const settingsBtn = page.locator('button[style*="left: 24px"][style*="top: 24px"]');
  await settingsBtn.click();
  await expect(page.getByText('Settings')).toBeVisible();
  await expect(page.getByText('Audio Configuration')).toBeVisible();
  await expect(page.getByText('Music Volume')).toBeVisible();
  await expect(page.getByText('SFX Volume')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Language' })).toBeVisible();
  await expect(page.getByText('Danger Zone')).toBeVisible();

  // Language switching from settings only + persistence on reload
  await page.getByRole('button', { name: 'Spanish' }).click();
  await expect(page.getByText('Opciones')).toBeVisible();
  await expect(page.getByText('Configuración de Audio')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Idioma' })).toBeVisible();

  await page.reload();
  await page.waitForLoadState('networkidle');
  await settingsBtn.click();
  await expect(page.getByText('Opciones')).toBeVisible();
  await expect(page.getByText('Configuración de Audio')).toBeVisible();

  // Restore EN to keep this spec deterministic for following assertions
  await page.getByRole('button', { name: 'Inglés' }).click();
  await expect(page.getByText('Settings')).toBeVisible();

  const dangerButton = page.getByText('DELETE PROFILE PROGRESS');
  await dangerButton.click();

  // Reset modal text
  await expect(page.getByText('Delete Progress?')).toBeVisible();
  await expect(page.getByText('This action is irreversible!')).toBeVisible();
  await expect(page.getByText('Type DELETE to confirm:')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Delete', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Cancel' }).click();

  // Close settings drawer via overlay
  await closeOverlayIfPresent(page, page.locator('div.fixed.inset-0'));

  // Bug report modal (bottom-right button)
  const bugBtn = page.locator('button[style*="bottom: 24px"][style*="right: 24px"]');
  await bugBtn.click();
  await expect(page.getByText('Discovered a bug?')).toBeVisible();
  await expect(page.getByText('Whoa... That sucks...')).toBeVisible();
  await closeAllOverlays(page);

  // Menu drawer (top-right button)
  await closeAllOverlays(page);
  const menuBtn = page.locator('button[style*="right: 24px"][style*="top: 24px"]');
  await clickThroughOverlay(menuBtn);
  await expect(page.getByText('Achievements', { exact: true })).toBeVisible();
  await expect(page.getByText('Total Level:')).toBeVisible();
  await expect(page.getByText('Badges:')).toBeVisible();
  await expect(page.getByText('Achievements:')).toBeVisible();

  // Parental verification flow
  // Close the menu drawer via overlay, then reopen the Settings drawer
  await closeOverlayIfPresent(page, page.locator('div.fixed.inset-0'));
  await settingsBtn.click();
  await expect(page.getByText('Settings')).toBeVisible();

  // Find the Parent? toggle on the profile card and open the modal
  const parentToggle = page.getByLabel('Parent?').first();
  await parentToggle.click();
  await expect(page.getByText('What is this?')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  // Trigger an invalid submit to surface the error message
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Incorrect answer. Try again!')).toBeVisible();
  // Close the modal via overlay
  await closeOverlayIfPresent(page, page.locator('div.fixed.inset-0'));
});
