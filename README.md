zootool-2-pinboard
==================

Convert Zootool bookmarks to Pinboard using the Pinboard API

With the Zootool bookmarking service shutting down, I needed to find another home for my collection of bookmarks. Pinboard ( www.pinboard.in ) looks like an excellent service, and I decided to give it a try. The Pinboard import had problems reading the JSON file exported by Zootool, so I wrote this Node.js app to convert the JSON file from Zootool to Pinboard using the Pinboard API.

To use this:

1. This app is designed to run as a Node.js app, so you'll need to have Node installed. ( http://nodejs.org/ )

2. From Zootool, export your bookmarks by going to "Settings" then the "Sync" tab. Choose "Download JSON file." (The other options, a bookmarks file, will not include your tags).

3. Sign up for Pinboard, and get your API Token from the "Password" tab of the "Settings" page.

4. In the directory where you install zootool-2-pinboard, edit the settings.js file and paste your Pinboard API token where indicated.

5. Run the app:

node app.js file-path

where file-path is the path to your Zootool export JSON file.

Sheila Ruth
sruth@imaginatorpress.com
