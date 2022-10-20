# #!/bin/bash

sleep 5
sudo apt-get update

sleep 5
yes |sudo apt install postgresql postgresql-contrib
echo "PostgreSQL Installation Completed"
sudo psql --version

sudo service postgresql status
echo "PostgreSQL Status check complete"

sleep 5
sudo systemctl stop postgresql.service
sudo systemctl start postgresql.service
sudo systemctl enable postgresql.service
sudo systemctl status postgresql.service

sleep 5
sudo -u postgres psql <<EOF
\x
ALTER ROLE postgres WITH PASSWORD 'cloud@fall2022';
CREATE DATABASE "UserDatabase";
\q
EOF

sudo systemctl stop postgresql.service
sudo systemctl start postgresql.service
sudo systemctl status postgresql.service