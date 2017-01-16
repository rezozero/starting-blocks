#
# Make commands for page block
#

# Ignore existing folders for these commands
.PHONY: build doc update clean push-doc uninstall

#
# Default task
#
all: install build

install : node_modules

update :
	npm update;

uninstall : clean
	rm -rf bower_components;
	rm -rf node_modules;

watch :
	gulp watch;

build :
	gulp;
#
# Clean generated files
#
clean :
	rm -rf doc;
	rm -rf build;
	rm -rf dist;
#
# Generate documentation
#
# needs esdoc: sudo npm install -g esdoc;
#
doc :
	esdoc -c esdoc.json;
#
# Push generated Documentation on Rezo Zero host.
# Credentials required, of course
push-doc : doc
	rsync -avcz doc/ pageblock@vps1.rezo-zero.com:~/public_html/;

node_modules:
	npm install;
