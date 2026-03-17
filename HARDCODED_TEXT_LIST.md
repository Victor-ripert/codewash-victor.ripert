# Hardcoded Text in the CodeWash Application

This document lists all hardcoded text strings found in the codebase, organized by file location.

## src/App.jsx

| Text | Line(s) | Usage |
|------|---------|-------|
| `"Mic Off"` | 45 | Voice recognition constant - text displayed when microphone is off |
| `"Player 1"` | 55 | Default profile name |
| `"Player 2"` | 55 | Default profile name |
| `"Player 3"` | 55 | Default profile name |
| `"currentProfile_v1"` | 53 | LocalStorage key name |
| `"heroProfileNames_v1"` | 54 | LocalStorage key name |
| `"heroParentStatus_v1"` | 55 | LocalStorage key name |

## src/components/drawers/MenuDrawer.jsx

| Text | Line(s) | Usage |
|------|---------|-------|
| `"Achievements"` | 37 | Header title |
| `"Total Level:"` | 40 | Statistics label |
| `"Badges:"` | 41 | Statistics label |
| `"Achievements:"` | 42 | Statistics label |
| `"Skill Badges Section"` | 48 | Section comment |
| `"Compact Badge Row"` | 81 | Section comment |
| `"Special Achievements"` | 133 | Section header title |
| `"LEGENDARY!"` | 128 | Badge tier name |
| `"Lvl"` | 65 | Level abbreviation prefix |
| `"Lvl 180+"` | 129 | Tooltip text for legendary badge |

## src/components/drawers/SettingsDrawer.jsx

| Text | Line(s) | Usage |
|------|---------|-------|
| `"Settings"` | 12 | Header title |
| `"Select File"` | 20 | Section header |
| `"Audio Configuration"` | 35 | Section header |
| `"Music Volume"` | 38 | Volume control label |
| `"%"` | 39 | Percentage symbol |
| `"SFX Volume"` | 42 | Volume control label |
| `"%"` | 43 | Percentage symbol |
| `"Danger Zone"` | 51 | Section header |
| `"DELETE PROFILE PROGRESS"` | 54 | Button text |

## src/components/drawers/CosmeticsDrawer.jsx

| Text | Line(s) | Usage |
|------|---------|-------|
| `"Themes & Cosmetics"` | Line ~65 | Header title |
| `"Theme Select"` | Line ~69 | Section header |
| `"Border Effects"` | Line ~96 | Section header |

### Border Effects List (BORDER_EFFECTS array)

| ID | Name | Badge | Description |
|----|------|-------|-------------|
| `solid` | `Default` | `null` | `Eternal golden radiance` |
| `solid-picker` | `Default` | `Wood` | `Customizable eternal glow` |
| `gradient` | `Copper` | `Stone` | `Mesmerizing arcane rotation` |
| `sparkle` | `Cloudy` | `Gold` | `Celestial stardust shimmer` |
| `electric` | `Lightning Rod` | `Iron` | `Thunderous plasma surge` |
| `lifestream` | `Lifestream` | `Emerald` | `Flowing ethereal energy` |
| `frost` | `Frost` | `Diamond` | `Glacial crystal majesty` |
| `fire` | `Lava` | `Netherite` | `Infernal blazing fury` |
| `shadow` | `Nether Portal` | `Obsidian` | `Abyssal void whispers` |
| `rainbow` | `Legendary!` | `Star` | `Prismatic legendary aura` |

### Achievement Effects List (ACHIEVEMENT_EFFECTS array)

| ID | Name | Achievement | Description |
|----|------|-------------|-------------|
| `livewire` | `Live Wire` | `speed_demon` | `Volatile electric arcs` |
| `void` | `Cosmic Void` | `world_ender` | `Infinite starlit expanse` |
| `toxic` | `Toxin` | `monster_manual` | `Caustic acid drip` |
| `holo` | `Hologram` | `perfectionist` | `Digital reality glitch` |
| `crystal` | `Crystalline` | `full_set` | `Prismatic shard array` |

## src/components/modals/ResetModal.jsx

| Text | Line(s) | Usage |
|------|---------|-------|
| `"DELETE"` | 6 | Password/confirmation word |
| `"Delete Progress?"` | 48 | Modal title |
| `"Are you sure you want to delete all progress for this profile?"` | 49 | Confirmation message |
| `"This action is irreversible!"` | 49 | Warning text |
| `"Type"` | 50 | Instruction prefix |
| `"DELETE"` | 50 | Instruction - confirmation word to type |
| `"to confirm:"` | 50 | Instruction suffix |
| `"Please type DELETE to confirm."` | 62 | Error message |
| `"Cancel"` | 65 | Button text |
| `"Delete"` | 73 | Button text |

## src/components/modals/BugReportModal.jsx

| Text | Line(s) | Usage |
|------|---------|-------|
| `"Discovered a bug?"` | 10 | Modal title |
| `"Whoa... That sucks..."` | 11 | Sympathy message |

## src/components/ui/ParentalVerificationModal.jsx

| Text | Line(s) | Usage |
|------|---------|-------|
| `"FLOPPY DISK"` | 6 | Parental verification answer |
| `"What is this?"` | 81 | Modal title |
| `"Incorrect answer. Try again!"` | 106 | Error message |
| `"Submit"` | 113 | Button text |

## src/components/profile/ProfileCard.jsx

| Text | Line(s) | Usage |
|------|---------|-------|
| `"Parent"` | 68 | Parent status label |
| `"Parent?"` | 73 | Parent verification checkbox label |
| `"P"` | 86 | Profile identifier prefix |
| `"LV."` | 94 | Level abbreviation |
| `"Skill Proficiency"` | 105 | Carousel section label |
| `"text-slate-300"` | 104 | CSS class (not strictly hardcoded text) |

## src/components/skills/SkillCard.jsx

| Text | Line(s) | Usage |
|------|---------|-------|
| `"Pink"` | 28 | Axolotl color name |
| `"Cyan"` | 29 | Axolotl color name |
| `"Gold"` | 30 | Axolotl color name |
| `"Brown"` | 31 | Axolotl color name |
| `"Blue"` | 32 | Axolotl color name |
| `"Red"` | 33 | Axolotl color name |
| `"Green"` | 34 | Axolotl color name |
| `"Black"` | 35 | Axolotl color name |

## src/components/ui/GlobalStyles.jsx

| Text | Line(s) | Usage |
|------|---------|-------|
| `'VT323'` | 4 | Font family name |
| `'monospace'` | 5 | Font family fallback |
| `@keyframes toast-slide` | 15-19 | Animation name |
| `@keyframes achievement-toast` | 22-40 | Animation name |
| `@keyframes shake-flipped` | 43-47 | Animation name |
| `@keyframes scroll-left` | 50-54 | Animation name |
| `@keyframes rainbow` | 56-62 | Animation name |
| `@keyframes bob` | 65-67 | Animation name |
| `@keyframes knockback` | 69-75 | Animation name |
| `@keyframes shake` | 77-82 | Animation name |
| `@keyframes rainbow-ring` | 130-142 | Animation name |
| `@keyframes border-rainbow` | 152-160 | Animation name |

## src/utils/soundManager.js

### Mob Name Mappings (Lines 31-80)

| Display Name | Asset Key |
|---|---|
| `Zombie` | `zombie` |
| `Creeper` | `creeper` |
| `Skeleton` | `skeleton` |
| `Spider` | `spider` |
| `Enderman` | `endermen` |
| `Blaze` | `blaze` |
| `Ghast` | `ghast` |
| `Slime` | `slime` |
| `Phantom` | `phantom` |
| `Piglin` | `piglin` |
| `Hoglin` | `hoglin` |
| `Drowned` | `drowned` |
| `Pillager` | `pillager` |
| `Evoker` | `evoker` |
| `Guardian` | `guardian` |
| `Magma Cube` | `magmacube` |
| `Witch` | `witch` |
| `Ender Dragon` | `enderdragon` |
| `Wither` | `wither` |
| `Warden` | `warden` |
| `Elder Guardian` | `elderguardian` |
| `Ravager` | `ravager` |
| `Wither Skeleton` | `wither_skeleton` |
| `Creaking` | `creaking` |
| `Cat` | `cat` |
| `Chicken` | `chicken` |
| `Cow` | `cow` |
| `Pig` | `pig` |
| `Sheep` | `sheep` |
| `Wolf` | `wolf` |
| `Dolphin` | `dolphin` |
| `Fox` | `fox` |
| `Panda` | `panda` |
| `Parrot` | `parrot` |
| `Horse` | `horse` |
| `Turtle` | `turtle` |
| `Rabbit` | `rabbit` |
| `Bunny` | `rabbit` |
| `Mooshroom` | `mooshroom` |
| `Polar Bear` | `polarbear` |
| `Llama` | `llama` |
| `Bat` | `bat` |
| `Bee` | `bee` |
| `Villager` | `villager` |
| `Iron Golem` | `irongolem` |
| `Wandering Trader` | `wandering_trader` |
| `Strider` | `strider` |

## Summary

- **Total Files Analyzed**: 9
- **Total Distinct Hardcoded Text Strings**: 100+
- **Key Areas with Hardcoded Text**:
  - UI Labels and Headers
  - Modal Titles and Messages
  - Verification Prompts and Answers
  - Border Effect Descriptions
  - Mob Names and Mappings
  - CSS Animation Names
  - LocalStorage Keys
  - Configuration Constants

## Recommendations

1. **Consider Internationalization (i18n)**: Many UI strings should be moved to a localization system for multi-language support
2. **Create Constants File**: Move hardcoded strings to a dedicated configuration/constants file
3. **Define Enums**: Mob names and effect IDs should be in enumerated constants
4. **Separate Configuration**: Border effects and achievement effects could be moved to JSON or a data structure
5. **CSS Classes**: Consider using CSS-in-JS or SCSS variables for repeated color and styling values
