# Publishing

## Code Flow

We'll always create PRs to merge into the `main` branch.

## App pipeline

Once a PR is merged into `main`, it will be built and deployed to the `staging` release channel automatically. Once the
latest JS bundle is pushed, we can test the app using Expo Go. After testing and things look good, we can promote the
release to production.
