# Slack Development Overview

This directory contains reference documentation for building Slack applications using the Slack CLI and Bolt frameworks.

## Documentation Structure

### Slack CLI

The Slack CLI is a command-line interface for creating and managing Slack apps from the terminal. It works with both the Deno Slack SDK and Bolt frameworks.

**Key documents:**
- [Slack CLI Overview](slack-cli/slack-cli-overview.md) - Main CLI documentation and getting started guide
- [Running Slack CLI Commands](slack-cli/running-commands.md) - Complete list of available commands
- [Slack CLI Command Reference](slack-cli/slack-commands-reference.md) - Detailed command syntax and flags
- [Using Slack CLI with Bolt](slack-cli/slack-cli-with-bolt.md) - Integration guide for Bolt frameworks

**Important CLI commands:**
```bash
slack login       # Authenticate with your Slack workspace
slack create      # Create a new Slack app
slack init        # Initialize an existing app (for Bolt projects)
slack run         # Start local development server
slack deploy      # Deploy to production
```

### Bolt Frameworks

Bolt is Slack's official framework for building apps with modern Slack features. Available in JavaScript and Python.

**Key documents:**
- [Bolt for JavaScript Overview](bolt/bolt-javascript-overview.md) - JavaScript framework documentation
- [Bolt for Python Overview](bolt/bolt-python-overview.md) - Python framework documentation

**Choose your framework:**
- **Bolt for JavaScript**: Best for Node.js developers, integrates with existing JavaScript/TypeScript tooling
- **Bolt for Python**: Best for Python developers, includes async support and FaaS adapters

### App Manifests

App manifests are YAML/JSON configuration files that define your Slack app's features, permissions, and settings.

**Key documents:**
- [Configuring Apps with App Manifests](app-manifests/configuring-apps-with-manifests.md) - Complete manifest reference

**Key concepts:**
- Create apps from manifests for rapid development
- Export/share manifests between environments
- Programmatic app management via manifest APIs
- Configuration tokens for API access (expire after 12 hours)

## Quick Start Workflow

### Creating a Bolt App with Slack CLI

1. **Install and authenticate:**
   ```bash
   slack login
   ```

2. **Create a new app:**
   ```bash
   slack create
   ```
   Select "Starter app" and choose JavaScript or Python.

3. **Run locally:**
   ```bash
   cd your-app-name
   slack run
   ```

4. **Deploy to production:**
   ```bash
   slack deploy
   ```

### Manifest Source Configuration

- **Bolt apps**: Default manifest source is `remote` (app settings page is source of truth)
- **Deno apps**: Default manifest source is `local` (local `manifest.json` is source of truth)

You can change the manifest source in your `config.json` file.

## Official Resources

### Documentation Sites
- **Slack Developer Docs**: https://docs.slack.dev/
- **API Reference**: https://api.slack.com/

### GitHub Repositories

**Bolt Frameworks:**
- Bolt for JavaScript: https://github.com/slackapi/bolt-js
- Bolt for Python: https://github.com/slackapi/bolt-python

**Starter Templates:**
- Bolt JavaScript Starter: https://github.com/slack-samples/bolt-js-starter-template
- Bolt Python Starter: https://github.com/slack-samples/bolt-python-starter-template

**CLI:**
- Slack CLI (open source since April 2025): https://github.com/slackapi/slack-cli

### Support

- **Email**: support@slack.com
- **Issue Trackers**: Each GitHub repository has an issue tracker for questions and bug reports

## Key Features by Framework

### Bolt for JavaScript
- Message sending and listening
- Interactive UI components (buttons, modals, etc.)
- AI integration
- Custom workflow steps
- Socket Mode for local development
- AWS Lambda deployment support
- Comprehensive middleware system

### Bolt for Python
- Message sending and listening
- Interactive UI components
- AI chatbot support
- Custom workflow steps
- Socket Mode
- Lazy listeners for FaaS environments
- Platform adapters (AWS, GCP, Azure)
- Async/await support

## Recent Updates (2025)

- **April 2025**: Slack CLI became open source
- **February 2025**: Slack CLI v3.0.0 released with official Bolt framework support
- **May 2025**: Slack CLI v3.1.0 added support for local manifest sources
- **September 2025**: Slack CLI v3.8.0 added `slack samples --list` command

## Next Steps

1. Review the [Slack CLI Overview](slack-cli/slack-cli-overview.md) to understand CLI capabilities
2. Choose your framework and read the corresponding Bolt overview
3. Understand [app manifests](app-manifests/configuring-apps-with-manifests.md) for configuration
4. Check out the starter templates on GitHub to see working examples
5. Follow the [Bolt integration guide](slack-cli/slack-cli-with-bolt.md) for CLI + Bolt workflow
