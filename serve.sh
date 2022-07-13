#!/bin/sh

node_ver=$(node --version)
if [[ $node_ver != "v14"* ]]; then
	echo "node version: $node_ver, please use v14"
	exit -1
fi

gitbook serve
