rm -r assets fonts scripts styles maps
cp -r dist/* .
git add --all .
git commit -m "$(date)"
