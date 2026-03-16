import { test, expect } from '@playwright/test';

const clickIfVisible = async (locator) => {
  if (await locator.isVisible()) {
    await locator.click();
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
  await expect(page.getByText('Danger Zone')).toBeVisible();
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
  await clickIfVisible(page.locator('div.fixed.inset-0').first());

  // Bug report modal (bottom-right button)
  const bugBtn = page.locator('button[style*="bottom: 24px"][style*="right: 24px"]');
  await bugBtn.click();
  await expect(page.getByText('Discovered a bug?')).toBeVisible();
  await expect(page.getByText('Whoa... That sucks...')).toBeVisible();
  await clickIfVisible(page.locator('div.fixed.inset-0').first());

  // Menu drawer (top-right button)
  const menuBtn = page.locator('button[style*="right: 24px"][style*="top: 24px"]');
  await menuBtn.click();
  await expect(page.getByText('Achievements')).toBeVisible();
  await expect(page.getByText('Total Level:')).toBeVisible();
  await expect(page.getByText('Badges:')).toBeVisible();
  await expect(page.getByText('Achievements:')).toBeVisible();

  // Skill card color labels (ensure list text unchanged)
  await expect(page.getByText('Pink')).toBeVisible();
  await expect(page.getByText('Cyan')).toBeVisible();

  // Parental verification flow
  // Find the Parent? toggle on the profile card and open the modal
  const parentToggle = page.getByText('Parent?');
  await parentToggle.click();
  await expect(page.getByText('What is this?')).toBeVisible();
  await expect(page.getByText('Incorrect answer. Try again!')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  // Close the modal via overlay
  await clickIfVisible(page.locator('div.fixed.inset-0').first());
});
