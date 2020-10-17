#!/usr/bin/env bash

# vermos: Script for enabling VERMOS on IRIS Community Edition

# Install Node.js Using NVM

apt-get update
apt-get install -y build-essential python-minimal curl subversion git


if [ -f "/usr/bin/node" ]; then

  echo "Node.js appears to have already been installed - aborting"

else

  VERSION=${1:-12}

  # Node.js

  echo 'Installing Node.js'

  cd ~

  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
  nvm install $VERSION

  echo 'Node.js has been installed.  Check by typing: node -v'

  ln -s /usr/irissys/bin /ISC/dur/bin

  # Now install the mgsql routines

  svn export https://github.com/chrisemunt/mgsql/trunk/m /ISC/vermos-install/m

  export LD_LIBRARY_PATH="/usr/irissys/bin"

  cd /ISC/vermos-install
  npm install
  node install_mgsql

fi
