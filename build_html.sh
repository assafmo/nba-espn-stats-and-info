#!/bin/bash

#version=$(date -Iseconds)

echo '<html>' > index.html
echo '<head>' >> index.html
echo '<title>NBA ESPN Stats & Info</title>' >> index.html
echo '<meta charset="UTF-8">' >> index.html
echo '<meta name="viewport" content="width=device-width, initial-scale=1" />' >> index.html
echo '<script async src="https://getmirrorshades.com/agent.js" data-siteId="MA-ARPDDX-NNR"></script>' >> index.html
echo '</head>' >> index.html
echo '<body style="background-color: #efefef;">' >> index.html
echo '<center>' >> index.html
echo '<link rel="stylesheet" type="text/css" href="index.css"></link>' >> index.html
echo '<div id="loader"></div>' >> index.html
echo '<div id="content">' >> index.html


newest_id_to_get=$(\
	curl -s --compressed 'https://twitter.com/ESPNStatsInfo' | \
	tr -d '\n' | \
	sed 's/data-tweet-id/\ndata-tweet-id/g' | \
	grep -F TweetText | \
	head -1 | \
	awk -F '"' '{print $2}' \
)


#get last max tweets
max=25
count=0
page_count=0
found_ids=''
while [ $count -lt $max ]; do 
	tweets=$( \
		curl -s --compressed "https://mobile.twitter.com/i/rw/profile/timeline?max_id=$newest_id_to_get&screen_name=ESPNStatsInfo&type=tweets" | \
		tr -d '\n' | \
		sed 's/data-tweet-id/\ndata-tweet-id/g' | \
		grep -F TweetText \
	)

	page=$( \
		echo "$tweets" | \
		grep -F -f keywords.list | \
		awk -F '"' '{print $2}' \
	)

	found_ids=$(printf "$found_ids\n$page" | sort -r -n | uniq)
	
	count=$(echo "$found_ids" | wc -l)
	page_count=$((page_count+1))
	
	echo "$count $max $page_count" | awk '{print "found=" $1, "looking_for=" $2, "page_count=" $3, "progress=" 100*$1/$2 "%"}'

	newest_id_to_get=$(echo "$tweets" | tail -1 | awk -F '"' '{print $2}')
done

echo "$found_ids" | head -$max | \
xargs --verbose -n 1 -I {} curl -s --compressed "https://api.twitter.com/1.1/statuses/oembed.json?id={}" | \
jq --raw-output '.html' | \
sed 's/<script.*script>/ /g' >> index.html

echo '</div>' >> index.html
echo '</center>' >> index.html
echo '<script src="index.js" charset="utf-8"></script>' >> index.html
echo '<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>' >> index.html
echo '</body>' >> index.html
echo '</html>' >> index.html

