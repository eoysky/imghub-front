#!/bin/bash
echo "开始更新项目"
git checkout --orphan latest_branch
git add -A
git commit -am "remove history & reinitialize"
git branch -D master
git branch -m master
git push -f origin master
git branch --set-upstream-to=origin/master master
exit 0;