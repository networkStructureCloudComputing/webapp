#!/bin/bash

sleep 10
sudo apt-get update -y
yes |sudo apt-get install gcc g++ make

sleep 10
sudo apt policy nodejs

sleep 15
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install -y nodejs
echo "Node installation completed"

sleep 10
echo "Starting Application Installation"

sleep 15
yes |sudo apt-get install unzip
cd ~/ && unzip nodeApi.zip

sleep 15
npm i
echo "Node Dependency Added"

sleep 15
sudo mv /home/ubuntu/packer/nodeApi.service /etc/systemd/system/nodeApi.service
echo "Move Completed"
sudo systemctl enable nodeApi.service
echo "Enabled"
echo "Starting"
sudo systemctl start nodeApi.service
echo "Started"