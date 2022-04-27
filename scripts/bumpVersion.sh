#!/bin/zsh

VERSION=$1

if [ -z "$VERSION" ]; then
  echo "Usage: bumpVersion.sh <version>"
  exit 1
fi

echo "Bumping version to $VERSION..."
npm version --workspaces $VERSION

echo "Creating git tag..."
git tag "v$VERSION"

git push origin "v$VERSION"

