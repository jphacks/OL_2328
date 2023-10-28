#!/bin/bash

npm run build
npx cap sync
npx cap open android