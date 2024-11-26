#!/bin/sh

node_ver=$(node --version)
if [[ $node_ver != "v10"* ]]; then
	echo "node version: $node_ver, please use v10"
	exit -1
fi

gitbook build ./ ./docs
