# Avatar Image Setup

To add your avatar image to the guide:

1. **Save the avatar image** as `avatar.png` in the `public/` folder
   - Path: `cursorfornestodesigners/public/avatar.png`
   - The image should be square (recommended: 200x200px or larger)
   - Supported formats: PNG, JPG, WebP

2. **The image will automatically appear** in all commentary bubbles throughout the guide

3. **If the image doesn't exist**, a fallback user icon will be displayed

## Project Starter Download Setup

To make the Project Starter folder downloadable:

### Option 1: Public Folder (Recommended for small files)
1. Zip your Project Starter folder (40kb is perfect for this)
2. Name it `project-starter.zip`
3. Place it in the `public/` folder
4. The download link in the guide will automatically work

### Option 2: GitHub Release
1. Create a GitHub repository (or use an existing one)
2. Create a new release
3. Attach `project-starter.zip` as a release asset
4. Update the download link in `app/page.tsx` to point to:
   ```
   https://github.com/your-username/your-repo/releases/download/v1.0.0/project-starter.zip
   ```

### Option 3: Cloud Storage
1. Upload `project-starter.zip` to Google Drive, Dropbox, or similar
2. Make it publicly shareable
3. Get the direct download link
4. Update the download link in `app/page.tsx`
