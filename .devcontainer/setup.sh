apt-get update
apt-get upgrade -y
apt-get autoremove -y
npm i -g npm@latest
npm run setup-all
npm run build-all
echo "Installed and built successfully. Use \"npm run serve\" to run the app."