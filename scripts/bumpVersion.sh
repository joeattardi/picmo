#!/bin/zsh

VERSION=$1

if [ -z "$VERSION" ]; then
  echo "Usage: bumpVersion.sh <version>"
  exit 1
fi

echo "Bumping version to $VERSION..."
npm version --workspace packages $VERSION
npm version --no-git-tag-version $VERSION
git commit -am "Bump version to $VERSION"

echo "Creating git tag..."
git tag "v$VERSION"
git push origin "v$VERSION"
git push origin main
