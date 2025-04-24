#!/bin/dash

for repo in */; do
    if [ -d "$repo" ] && [ -f "$repo/package.json" ]; then
        echo "Traitement du dépôt: $repo"
        (
            cd "$repo" || exit
            npm install
            npm start > /dev/null &
        )
    fi
done

wait  # attend que tous les npm start aient fini (utile si certains se terminent naturellement)
