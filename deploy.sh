#! /bin/bash
git commit -am "$1"
git push 
pm2 deploy ecosystem.config.js staging update