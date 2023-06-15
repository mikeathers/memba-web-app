#!/usr/bin/env bash

set -euo pipefail


echo "--- 🚀 Installing npm dependencies..."
yarn install --frozen-lockfile

cd deployment

echo "--- 🚀 Installing npm dependencies..."
yarn install --frozen-lockfile

echo "--- 🚀 Linting cdk..."
yarn lint

echo "--- 🚀 Running cdk tests..."
yarn test

cd ../

echo "--- 🚀 Linting next app..."
yarn lint

echo "--- 🚀 Run next build..."
yarn open-next-build


echo "--- 🚀 Zipping build..."
zip -r build.zip .open-next