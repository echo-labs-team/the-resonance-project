---
id: publishing
title: Publishing
---

# Publishing
## Code Flow
Code flows from `feature_branch -> dev -> master`. New features are built in local feature branches, tested locally, and then pushed to a `feature branch`, where a PR is opened for `dev`. Once the feature has been reviewed and approved, it is merged into `Dev`. A github action will automatically push this new feature to all beta testing devices (this action is in the works). After a set amount of time, a release from `dev` to `master` happens. Once the merge to master is complete, the feature will be pushed to production. 

## Releasing to Beta Testers and Production
In both the beta testing process and production process, to publish, you simply need to execute `npm run publish`. This will run 
```
npx expo-optimize .  && expo publish --release-channel=<release_channel>
```
Here are the current values for `<release_channel>`
| branch | <release_channel> |
|--------|-------------------|
| master | release           |
| dev    | develop_1_0_1     |

The release channel for `dev` will change based on the current major, minor, and patch numbers. 
