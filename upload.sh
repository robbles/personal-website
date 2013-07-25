#!/bin/bash
s3cmd -v -c ~/.s3cfg_personal sync ./ s3://rob.odwyer.cc/ --acl-public --delete-removed --exclude=".git*" --exclude=Gruntfile.js --exclude="less/*" --exclude="node_modules/*" --exclude="upload.sh"
