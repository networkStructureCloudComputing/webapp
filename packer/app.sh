#!/bin/bash

sleep 5
sudo apt-get update -y
yes |sudo apt-get install gcc g++ make

sleep 5
sudo apt policy nodejs

sleep 5
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install -y nodejs
echo "Node installation completed"

sleep 5
echo "Starting Application Installation"

sleep 5
yes |sudo apt-get install unzip
cd ~/ && unzip nodeApi.zip

sleep 5
npm i
echo "Node Dependency Added"

sleep 5
sudo mv /home/ubuntu/packer/nodeApi.service /etc/systemd/system/nodeApi.service
echo "Move Completed"
sudo systemctl enable nodeApi.service
sudo systemctl start nodeApi.service
sudo systemctl stop nodeApi.service
