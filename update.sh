#!/bin/bash

git pull

./build_keywords.sh
./build_html.sh

git add index.html
git commit -m "`date -Iseconds`"
git push
