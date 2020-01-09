#!/bin/bash
# set the STRING variable
cd src/assets/icons
for i in $(ls -d */);
do svg2sprite ${i%%//} ../sprites/${i%%//}.svg --stripAttrs fill --stripAttrs stroke --stripAttrs id
done
STRING="Hello World!"
# print the contents of the variable on screen
echo $STRING
sleep 30;
echo $STRING

#  echo ${i%%//};
