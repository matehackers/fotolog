CURR_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ $CURR_BRANCH != "gh-pages" ]; then
    echo "Você precisa estar no branch 'gh-pages' para fazer o deploy do site";
    exit 1
fi
git checkout main -- public/
git restore --staged .
rsync -avzP public/* .
rm -rf public/
git add .

echo "   ▄▄▄▄███▄▄▄▄      ▄████████     ███        ▄████████         ▄████████  ▄█        ▄██████▄     ▄██████▄  
 ▄██▀▀▀███▀▀▀██▄   ███    ███ ▀█████████▄   ███    ███        ███    ███ ███       ███    ███   ███    ███ 
 ███   ███   ███   ███    ███    ▀███▀▀██   ███    █▀         ███    █▀  ███       ███    ███   ███    █▀  
 ███   ███   ███   ███    ███     ███   ▀  ▄███▄▄▄           ▄███▄▄▄     ███       ███    ███  ▄███        
 ███   ███   ███ ▀███████████     ███     ▀▀███▀▀▀          ▀▀███▀▀▀     ███       ███    ███ ▀▀███ ████▄  
 ███   ███   ███   ███    ███     ███       ███    █▄         ███        ███       ███    ███   ███    ███ 
 ███   ███   ███   ███    ███     ███       ███    ███        ███        ███▌    ▄ ███    ███   ███    ███ 
  ▀█   ███   █▀    ███    █▀     ▄████▀     ██████████        ███        █████▄▄██  ▀██████▀    ████████▀  
                                                                         ▀
"

echo "Para publicar o site, revise as alterações com \`git status\` e,
se estiver ok, faça um commit e suba-o com \`git push\`"
exit 0