# Running Slack CLI Commands

## Overview

The Slack CLI enables command-line interaction with your applications. Using the primary `slack` command, you can create, run, and deploy apps, manage triggers, and access datastores.

To see available commands, run:
```bash
slack help
```

## Command Syntax

The general format for executing commands follows this pattern:

```bash
slack <command> <subcommand> [flags]
```

To access help information about specific subcommands and their flags:

```bash
slack <subcommand> --help
```

## Available Commands

The platform provides the following commands and subcommands:

| Command | Purpose |
|---------|---------|
| `slack activity` | Display the app activity logs from the Slack Platform |
| `slack app` | Install, uninstall, and list teams with the app installed |
| `slack auth` | Add and remove local team authorizations |
| `slack collaborator` | Manage app collaborators |
| `slack create` | Create a Slack project |
| `slack datastore` | Query an app's datastore |
| `slack delete` | Delete the app |
| `slack deploy` | Deploy the app to the Slack Platform |
| `slack doctor` | Check and report on system and app information |
| `slack env` | Add, remove, and list environment variables |
| `slack external-auth` | Manage external authorizations and client secrets |
| `slack feedback` | Share feedback about your experience or project |
| `slack function` | Manage the functions of an app |
| `slack install` | Install the app to a team |
| `slack list` | List all authorized accounts |
| `slack login` | Log in to a Slack account |
| `slack logout` | Log out of a team |
| `slack manifest` | Print the app manifest of a project or app |
| `slack platform` | Deploy and run apps on the Slack Platform |
| `slack run` | Start a local server to develop and run the app locally |
| `slack samples` | List available sample apps |
| `slack trigger` | List details of existing triggers |
| `slack uninstall` | Uninstall the app from a team |
| `slack upgrade` | Check for available CLI or SDK updates |
| `slack version` | Print the version number |

## Additional Resources

- Full documentation: https://docs.slack.dev/tools/slack-cli/guides/running-slack-cli-commands/
- Command reference: [Slack CLI Command Reference](slack-commands-reference.md)
