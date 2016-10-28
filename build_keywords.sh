#!/bin/bash
cat keywords/* | sort | uniq | grep . > ../keywords.list
