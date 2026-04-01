# Slack CLI Command Reference

## Overview

The `slack` command is the primary entry point for the Slack command-line tool, used to "create, run, and deploy Slack apps." Users can get started by consulting the documentation at https://docs.slack.dev/tools/slack-cli.

## Basic Syntax

```bash
slack <command> <subcommand> [flags]
```

## Available Flags

| Flag | Description |
|------|-------------|
| `-a, --app string` | Use a specific app ID or environment |
| `--config-dir string` | Use a custom path for system config directory |
| `-e, --experiment strings` | Use the experiment(s) in the command |
| `-f, --force` | Ignore warnings and continue executing command |
| `-h, --help` | Display help information |
| `--no-color` | Remove styles and formatting from outputs |
| `-s, --skip-update` | Skip checking for latest version of CLI |
| `-w, --team string` | Select workspace or organization by team name or ID |
| `--token string` | Set the access token associated with a team |
| `-v, --verbose` | Print debug logging and additional info |

## Common Usage Examples

```bash
slack login       # Log in to your Slack account
slack create      # Create a new Slack app
slack init        # Initialize an existing Slack app
slack run         # Start a local development server
slack deploy      # Deploy to the Slack Platform
```

## Key Commands

### slack create

Create a Slack project from scratch or from a template.

With your CLI authenticated into the workspace you want to develop in, scaffold an app with the `slack create` command. If you don't pass an app name, slack will scaffold an app with a random alphanumeric name.

You can also create an app from a template by using the create command with the `--template` (or `-t`) flag and passing the link to the template's GitHub repo.

### slack run

Start a local server to develop and run the app locally.

```bash
slack run  # Run an app locally in a workspace
```

This command is used to start local development and allows you to see changes in real-time.

### slack deploy

Deploy the app to the Slack Platform for production use.

### slack init

Initialize an existing Slack app (useful for Bolt projects).

## Related Commands

The `slack` base command supports numerous subcommands including app management, authentication, datastore operations, deployment, environment configuration, triggers, and project initialization.

## Additional Resources

- Full documentation: https://docs.slack.dev/tools/slack-cli/reference/commands/slack/
- Running commands guide: [Running Slack CLI Commands](running-commands.md)
