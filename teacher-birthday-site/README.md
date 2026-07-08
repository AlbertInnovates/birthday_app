# Teacher's Birthday Surprise Site

This site is a single-page static surprise site built with HTML/CSS/JS. No backend, build tools, or installation required; it can be deployed directly to GitHub Pages.

## Changes Before Deployment

1. **Teacher's name**
   - Search for the text `Öğretmenim` on lines 6, 36, and 54 of `index.html`.
   - Replace the `Öğretmenim` text in the page title, the main surprise text on the entry screen, and the hero title with the actual name.

2. **Photo**
   - Replace the following file with the actual photo:
   - `assets/images/teacher-photo.jpg`
   - The photo path in the HTML is on line 72 of `index.html`.
   - If you use the same filename, you won't need to change the HTML.

3. **YouTube videos**
   - Search for `VIDEO_ID_1` and `VIDEO_ID_2` on lines 87 and 94 of `index.html`.
   - If the YouTube link is `https://www.youtube.com/watch?v=abc123DEF45`, the embed URL should be:
   - `https://www.youtube.com/embed/abc123DEF45`
   - It is recommended that the videos be shorter than 1 minute.

4. **Birthday sound**
   - `assets/sounds/birthday-tune.mp3` is currently just a placeholder file.
   - The sound path is on line 17 of `index.html`.
   - Be sure to replace it with a real `.mp3` file before deploying.
   - Since browsers block autoplaying audio, the music will play when the `Sürprizi Aç! 🎉` (Open the Surprise! 🎉) button on the entry screen is clicked.

5. **11 student messages**
   - All names and messages are in one place:
   - `js/messages.js`
   - The message array starts on line 3 of `js/messages.js`.
   - Edit the 11 items in the `window.birthdayMessages` array.
   - Each item has `name`, `text`, and `emoji` fields.

6. **Favicon**
   - If you want, replace `assets/icons/favicon.png` with a real icon.
   - The favicon path is on line 9 of `index.html`.

## Deploying to GitHub Pages

1. Create a new repository on GitHub.
2. Upload the files from inside the `teacher-birthday-site` folder to the repository.
3. Go to the repository settings: **Settings > Pages**.
4. Under **Build and deployment**, select `Deploy from a branch` as the source.
5. Choose `main` as the branch and `/root` as the folder, then save.
6. Your GitHub Pages link will be ready in a few minutes.

## Notes

- The site is mobile-responsive and designed to be viewed on a phone.
- Code comments are in English; all visible text is in Turkish.
- You can search for `TODO` in the project to find placeholder content.
