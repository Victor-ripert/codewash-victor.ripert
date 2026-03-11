# How to Add a New Theme

## Steps

### 1. Add background image

Place your background image in `public/assets/themes/`. Recommended size: 1920x1080, PNG or JPG.

### 2. Add logo image (optional)

Place a logo in `public/assets/themes/`. If you don't have one, you can reuse the background image as the logo.

### 3. Add theme to THEME_CONFIG

In `src/constants/gameData.jsx`, add an entry to the `THEME_CONFIG` object:

```js
'my_theme': {
    name: 'My Theme',
    style: { backgroundImage: `url('assets/themes/my_theme.png')`, backgroundSize: 'cover', backgroundPosition: 'center' },
    assets: {
        logo: 'assets/themes/my_theme_logo.png',
        cardBack: 'assets/themes/memorycard.jpg',  // or a custom card back
        mobs: {}  // optional: custom mob images for this theme
    },
    skills: {
        reading: { name: 'Skill Name', boss: 'Boss Name' },
        math: { name: 'Skill Name', boss: 'Boss Name' },
        writing: { name: 'Skill Name', boss: 'Boss Name' },
        cleaning: { name: 'Skill Name', boss: 'Boss Name' },
        memory: { name: 'Skill Name', boss: 'Boss Name' },
        patterns: { name: 'Skill Name', boss: 'Boss Name' }
    }
}
```

### 4. Add theme to THEMES_LIST

In the same file, add an entry to `THEMES_LIST`:

```js
{ id: 'my_theme', name: 'My Theme', img: 'assets/themes/my_theme.png' }
```

The `id` must match the key used in `THEME_CONFIG`.

### 5. Optional: custom memory card back

Place a card back image in `public/assets/themes/` and reference it in `assets.cardBack`.

### 6. Optional: custom mob images

Add mob images to the `assets.mobs` object to override default Minecraft mobs for your theme. If `mobs` is empty (`{}`), the game falls back to the default Minecraft mob images.

## Current Themes

| Theme | Background | Logo |
|-------|-----------|------|
| Minecraft | `minecraft.png` | `minecraft_logo.png` |
| K-Pop Demon Hunters | `kpop.jpg` | `kpop_logo.png` |
| Pokemon | `pokemon.jpg` | `pokemon_logo.png` |
| Spy | `spy.png` | `spy.png` |
| Sci-Fi | `Scifi.png` | `Scifi.png` |
| Fantasy | `fantasy.png` | `fantasy.png` |
