#!/bin/bash
cat keywords/* | sort | uniq | grep -E '^.+$' > keywords.list
