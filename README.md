# Dharohar — updated source

Based on your uploaded main archive. The other archive has identical application source; main includes GitHub Pages deployment.

## Run locally

Use Node.js 22 LTS or newer:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:3000/`).

```sh
npm run lint
npm run build
npm run preview
```

## Publish

Back up your repository, then replace its contents with the contents of this folder, including `.github/workflows/deploy.yml`. Do not upload the ZIP itself or put this folder inside another repository folder. Commit to `main`. In GitHub repository Settings → Pages, select **GitHub Actions**. The included workflow builds and deploys the site. The Vite base path is automatic: local development uses `/`, while GitHub Actions sets it to `/<repository-name>/` for GitHub Pages.

This package has not been deployed to your live website.

## Changes and limits

- Portable GitHub Pages base-path handling and a current Pages deployment workflow.
- Six-second camera opening, replay/skip controls, an interactive Three.js India diorama, reduced-motion support, and WebGL fallback.
- The map is an original stylized approximation inspired by your video, not a photorealistic reconstruction. Miniatures, terrain and positions are illustrative. The recording itself is not used.
- Separate Hawa Mahal and Amer (Amber) Fort entries.
- Taj Mahal uses AirPano's published photographic 360° embed.
- Hawa Mahal and Amer Fort use the same AirPano Jaipur tour. Select the monument inside its scene selector; there are no verified direct-start scene IDs configured.
- Sri Harmandir Sahib opens an external 360Cities panorama. In-page embedding permission was not verified.
- The original generated panorama drawings are removed. Other monuments retain their heritage details and explicitly state that photography has not been added.
- Existing state explorer, museum, and nearby-landmark features remain. Original historical text and existing thumbnail URLs have not undergone a comprehensive fact/licensing audit.

Tour sources are configured in `src/data/tourSources.ts`. To use your own licensed panorama, choose `kind: 'panorama'`, set its image URL, credit, and external source link. Local image URLs should use `import.meta.env.BASE_URL + 'panoramas/filename.jpg'`. Supply a genuine 2:1, 360×180-degree equirectangular photograph; normal wide photos are not spherical panoramas. Cross-origin images require CORS permission.

External tours load only after the visitor clicks Enter. Provider content, availability, controls, tracking and privacy are managed by the provider. Attribution and external fallbacks are visible. No API key is required for the configured sources.

## Verification

Production build and TypeScript checking passed before packaging. Local Chromium checks covered opening/replay/skip, four separate cards, iframe configuration, external Golden Temple link, mobile overflow and reduced motion, with no JavaScript runtime errors. External requests were blocked in those local tests; provider rendering was not end-to-end tested. Search navigation received a final component-remount fix after testing. Test your deployed site and provider tours on your own device before treating this as a release.
