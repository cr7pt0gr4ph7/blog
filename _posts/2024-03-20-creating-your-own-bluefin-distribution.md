---
layout: article
title: Creating your own Bluefin distribution
tags: ["Linux","Bluefin"]
permalink: /articles/creating-your-own-bluefin-distribution/
article_header:
  type: overlay
  theme: dark
  background_color: "#364F59"
  background_image:
    src: assets/img/posts/2024-03/pexels-pixabay-236482.jpg
    alignment: 100%
---

As mentioned in a [previous article],
I've migrated from Windows to a [Bluefin]-based Linux system.
As promised, here is a guide on how to setup your own Bluefin-based image builds using [GitHub Actions].

## Step 1: Setup your custom Bluefin distribution

### Step 1.1 Fork the `bluefin` repository

Step #1 is to create a home on GitHub for your own custom distribution by creating a fork of [ublue-os/bluefin].
Note that the forked repository needs to be public if you want to use GitHub Actions with a free GitHub account.


### Step 1.2: Create an image signing key

For security reasons, the built images should be signed.

For this, we need to create our own custom signing key pair, and upload its private key to GitHub.
This is easy to accomplish using the `cosign` command line tool,
which is preinstalled in the DevContainer that is configured for the bluefin repository.

1. Create a fine-grained GitHub access tokens that can access at least the repository
   for which you want to set the key, and has the "Read/Write Secrets" permission.
   This is a one-time setup only, and the Token can be revoked afterwards.

2. Generate the private key, and upload it to GitHub.
   The `cosign` CLI provides a single command that does both; you just need to provide it with the GITHUB_TOKEN:
   ```bash
   ❯ export GITHUB_TOKEN=github_pat_<...>
   ❯ cosign generate-key-pair github://cr7pt0gr4ph7/bluefin
   Enter password for private key: 
   Enter password for private key again: 
   Password written to COSIGN_PASSWORD github actions secret
   Private key written to COSIGN_PRIVATE_KEY github actions secret
   Public key written to COSIGN_PUBLIC_KEY github actions secret
   Public key also written to cosign.pub
   ```

3. Adapt ` .github/workflows/build.yml` by changing `COSIGN_PRIVATE_KEY: ${{ secrets.SIGNING_SECRET }}` to `COSIGN_PRIVATE_KEY: ${{ secrets.COSIGN_PRIVATE_KEY }}`

### Step 1.3: Remove uncessary build variants (optional)

You can edit `.github/workflows/build.yml` to restrict the variables in `jobs.push-ghcr.strategy.matrix`
such that you build only the images/variants that you are actually using &ndash;
there is no sense in wasting CPU time on building e.g. an `nvidia` variant,
if you don't have any use for it.

### Step 1.4: Enable the workflows

Go to `https://github.com/<yourrepo>/actions/workflows/build.yml` and `https://github.com/<yourrepo>/actions/workflows/contributors.yml`and enable these two workflows (which are disabled by GitHub by default on forking because they are scheduled workflows).

## Step 2: Run the build

Instead of waiting for the build to run by itself sometime during the next 24 hours,
we can manually trigger the "Build and Push Image" via the GitHub UI.

## Step 3: Mark the packages as public

The build (when successful) deploys the built images to the GitHub container registry.
The images have private visibility by default, and must be [marked as public][package-access-control] to enable the `rpm-ostree` tool to access them without authentication.
This can only be done after the packages have been uploaded for the first time,
but GitHub will remember the package visibility for all future uploads of that package.

## Step 4: Switch over your local system

Now that everything is ready, we can flip the lever and tell our local system to use your custom image builds instead in the future by issuing the following command:

```bash
rpm-ostree rebase ostree-image-signed:docker://ghcr.io/<owner>/bluefin-dx:gts
# or: rpm-ostree rebase ostree-image-signed:docker://ghcr.io/<owner>/bluefin:gts
```

### Step 4.2: Wait for the download to finish & reboot your system

The image download usually takes a few minutes to complete.
After the download completes, you are free to reboot your system.
If you want to be clever, you can reboot your system from the command line using `systemctl reboot`.

### Step 4.3: Enjoy your customized system!

After rebooting the system, you now should be running your customized Bluefin image that was built from your GitHub repository!

## Step 5: Keeping the image up-to-date

### Step 5.1: Periodically rerun the build

The build should be repeated periodically to pull in updated packages and security fixes.
The default `on.schedule.cron` setting in `build.yml` causes the image to be rebuild once per day,
but you can set any other value here (although we recommend rebuilding at least once a day because of security fixes).

### Step 5.2: Integrate future updates of the base image

To integrate future improvements of the official Bluefin base image,
you've got to periodically merge the `main` branch of [ublue-os/bluefin]
into your forked repository.

## Conclusion

This is is more or less a fire-and-forget setup: Once you have it up and running (and your GitHub account is secure!),
GitHub will automatically build an updated image once per day, which your local system will pull automatically
(also once per day).

My own Bluefin build setup can be found at [cr7pt0gr4ph7/bluefin], but there isn't anything to interesting to see there,
except for a few additional installed packages.

[previous article]: ./2024-03-13-applying-container-principles-to-the-desktop.md
[Bluefin]: https://projectbluefin.io/
[GitHub Actions]: https://github.com/features/actions
[package-access-control]: https://docs.github.com/en/packages/learn-github-packages/configuring-a-packages-access-control-and-visibility
[ublue-os/bluefin]: https://github.com/ublue-os/bluefin
[cr7pt0gr4ph7/bluefin]: https://github.com/cr7pt0gr4ph7/bluefin
