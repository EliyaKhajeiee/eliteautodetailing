#!/bin/bash
# Double-click this file (or run it in Terminal) to push the site to GitHub.
# It authenticates as YOU using your Mac's git login / browser prompt.

cd "$(dirname "$0")" || exit 1
echo "Setting up a clean git repo in: $(pwd)"

rm -rf .git
git init
git add -A
git commit -m "Elite Auto Detailing website — draft"
git branch -M main
git remote add origin https://github.com/eliyakhajeiee/eliteautodetailing.git
echo
echo "Pushing to GitHub (you may be asked to log in)…"
git push -u origin main

echo
echo "Done. If it succeeded, enable free hosting at:"
echo "  github.com/eliyakhajeiee/eliteautodetailing  ->  Settings -> Pages -> Branch: main / root"
echo
read -n 1 -s -r -p "Press any key to close."
