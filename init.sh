#!/bin/sh

node_ver=$(node --version)
if [[ $node_ver != "v12"* ]]; then
	echo "node version: $node_ver, please use v12"
	exit -1
fi

gitbook init
