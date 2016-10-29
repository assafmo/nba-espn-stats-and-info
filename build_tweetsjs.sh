#!/bin/bash

newest_id_to_get=$(\
	curl -s --compressed 'https://twitter.com/ESPNStatsInfo' | \
	tr -d '\n' | \
	sed 's/data-tweet-id/\ndata-tweet-id/g' | \
	grep -F TweetText | \
	head -1 | \
	awk -F '"' '{print $2}' \
)


echo '' > .tweets.js

#get last x pages of tweets
x=10
for ((i=1;i<=x;i++)); do 
	tweets=$( \
		curl -s --compressed "https://mobile.twitter.com/i/rw/profile/timeline?max_id=$newest_id_to_get&screen_name=ESPNStatsInfo&type=tweets" | \
		tr -d '\n' | \
		sed 's/data-tweet-id/\ndata-tweet-id/g' | \
		grep -F TweetText \
	)

	found_ids=$( \
		echo "$tweets" | \
		grep -F -f keywords.list | \
		awk -F '"' '{print $2}' \
	)

	if [ ! -z "$found_ids" ]; then
		echo "$found_ids" | \
		xargs -n 1 -I {} curl -s --compressed "https://api.twitter.com/1.1/statuses/oembed.json?id={}" >> .tweets.js
	fi

	newest_id_to_get=$(echo "$tweets" | tail -1 | awk -F '"' '{print $2}')

	echo "$i $x" | awk '{print 100*$1/$2 "%..."}'
done

cat .tweets.js | jq -s . > tweets.js
rm .tweets.js
