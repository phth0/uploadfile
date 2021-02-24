#! /bin/bash
git commit -am "$1"
git push && git push github
pm2 deploy ecosystem.config.js staging update