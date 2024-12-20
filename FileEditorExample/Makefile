

build:
	rm -rfv dist
	npm run build
	# replace dist/config.json "env": "dev" to "env": "prod"
	sed -i '' 's/"env": "dev"/"env": "prod"/g' dist/config.json
