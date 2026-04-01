# Configuring Apps with App Manifests

## Overview

App manifests are YAML or JSON configuration bundles for Slack applications. They enable rapid app creation, configuration, and reusability. Developers can share and reuse manifests to create development clones of production apps.

## Creating Apps Using Manifests

The process involves five steps:

1. Navigate to create a new app
2. Select the option to create "from a manifest"
3. Choose your development workspace
4. Paste your manifest configuration in the provided field
5. Review the summary and confirm creation

The system validates your manifest and creates the app according to specifications.

## Updating Configurations Via Manifests

Modify existing app configurations through the app settings page by accessing the **App Manifest** section in the sidebar. The editor supports both YAML and JSON formats with inline validation and typeahead assistance.

## App Manifest APIs

Five primary API methods manage apps programmatically:

- **apps.manifest.create**: Creates apps from JSON manifests
- **apps.manifest.update**: Modifies existing app configurations
- **apps.manifest.delete**: Removes apps
- **apps.manifest.export**: Exports existing app manifests
- **apps.manifest.validate**: Validates manifests against the correct schema

All methods require an app configuration access token.

## Configuration Tokens

Configuration tokens are user and workspace-specific, allowing management of multiple apps in one workspace with a single token.

### Token Rotation

Configuration tokens expire after 12 hours. Use the `tooling.tokens.rotate` method with your refresh token to obtain a new access token before expiration.

## Sharing Manifests

Export manifests from app config pages without sensitive authentication data. Share via:

- Direct copy/paste of configuration
- Downloadable files
- Pre-formatted URLs using the pattern: `https://api.slack.com/apps?new_app=1&manifest_yaml=<manifest_here>`

Ensure proper URL encoding before sharing links.

## Troubleshooting

Invalid manifest errors include an `errors` array detailing specific problems with corresponding pointer locations within your manifest for quick resolution.

## Additional Resources

- Full documentation: https://docs.slack.dev/app-manifests/configuring-apps-with-app-manifests
- API methods documentation: https://api.slack.com/reference/manifests
