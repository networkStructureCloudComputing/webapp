#!/bin/bash
sudo apt-get update -y

echo "Starting Installation for cloudwatch"
sudo curl -o /root/amazon-cloudwatch-agent.deb https://s3.amazonaws.com/amazoncloudwatch-agent/debian/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i -E /root/amazon-cloudwatch-agent.deb
echo "CloudwatchAgent Installation Completed!"
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/home/ubuntu/amazon-cloudwatch-agent.json -s

echo "CloudwatchAgent Status"
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -m ec2 -a status
sleep 5