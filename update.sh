#!/bin/bash
git pull
git add -A 
git commit -m "由 $USER 于 $(date "+%Y%m%d_%H%M") 更新"
git push
echo "由 $USER 于 $(date "+%Y%m%d_%H%M") 更新 完成！"