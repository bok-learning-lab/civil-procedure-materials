# Anthropic Documentation Index

Use this guide to jump straight to the doc that matches your task.

## API

- `api/anthropic-api-basics.md`: Message Batches end-to-end—creating batches, polling for completion, listing history, downloading `.jsonl` results, and cancelling work with Python, TypeScript, and cURL examples.

## Claude Agent SDK

- `claude-agents-sdk/claude-agents-sdk-overview.md`: High-level orientation and installation instructions for the Agent SDK across TypeScript and Python, including why you might choose it over direct API usage.
- `claude-agents-sdk/claude-agents-sdk-01-streaming-input.md`: Compares streaming sessions versus single-message mode, when to use each, and how streaming unlocks interrupts, permissions, and long-lived context.
- `claude-agents-sdk/claude-agents-sdk-02-handling-permissions.md`: Deep dive into permission controls—permission modes, `canUseTool`, hook-based approvals, and declarative settings.json rules, plus visual flow diagrams.
- `claude-agents-sdk/claude-agents-sdk-03-session-management.md`: Placeholder (currently empty) for session management guidance.
- `claude-agents-sdk/claude-agents-sdk-04-hosting-the-agents-sdk.md`: Production hosting considerations—container requirements, sandbox models, resource sizing, and deployment patterns for durable agent runtimes.
- `claude-agents-sdk/claude-agents-sdk-05-modifying-system-prompts.md`: Strategies for customizing system prompts via CLAUDE.md, preset prompts, prompt appends, and fully custom prompts with best-practice comparisons.
- `claude-agents-sdk/claude-agents-sdk-06-mcp-in-the-sdk.md`: How to register Model Context Protocol servers, choose transport types, manage resources, authenticate, and handle MCP errors inside SDK apps.
- `claude-agents-sdk/claude-agents-sdk-07-custom-tools.md`: Building bespoke tools with `createSdkMcpServer`/`tool`, enforcing type safety, handling errors, and shipping representative tool implementations.
- `claude-agents-sdk/claude-agents-sdk-08-subagents-in-sdk.md`: Explains subagent concepts, programmatic and filesystem definitions, isolation benefits, tool restrictions, and orchestration patterns.
- `claude-agents-sdk/claude-agents-sdk-09-slash-commands.md`: Reference for slash commands—discovering availability, sending commands (e.g., `/compact`, `/clear`), defining custom commands, and interpreting system responses.
- `claude-agents-sdk/claude-agents-sdk-10-tracking-costs.md`: Token accounting guide covering per-step usage, parallel tool tracking, billing heuristics, dashboard examples, and edge-case handling.
- `claude-agents-sdk/claude-agents-sdk-11-to-do-lists.md`: Shows how the SDK emits structured todo updates, how to monitor them in real time, and patterns for presenting progress back to users.
- `claude-agents-sdk/claude-agents-sdk-message-batches-examples.md`: Duplicate of the Message Batches cookbook with batch creation, polling, listing, result retrieval, and cancellation samples.
- `claude-agents-sdk/claude-agents-sdk-messages-examples.md`: Practical Messages API snippets—basic requests, multi-turn conversations, synthetic assistant turns, vision inputs, and tool/JSON/computer-use flows.
- `claude-agents-sdk/claude-agents-sdk-python-reference.md`: Full Python SDK API reference detailing functions, classes, content types, hooks, errors, advanced usage, and complete examples.
- `claude-agents-sdk/claude-agents-sdk-typescript-reference.md`: Comprehensive TypeScript SDK reference covering `query`, type definitions, tool IO contracts, permission types, and related resources.

## Claude Code

- `claude-code/getting-started-with-hooks.md`: Intro tutorial for registering Claude Code hooks, common automation scenarios, and a quickstart logging example.
- `claude-code/hooks-reference.md`: Configuration reference for every hook event, payload schema, MCP interactions, security considerations, and debugging tips.

## Claude Skills

- `claude-skills/claude-skills-with-api.md`: Overview of using Anthropic and custom Skills via the Messages API—container structure, file retrieval via the Files API, multi-turn patterns, limits, and best practices.
- `claude-skills/create-skill.md`: Currently mirrors the general Skills integration guide above; includes detailed examples for invoking Skills, downloading outputs, handling long-running jobs, and reusing containers.
- `claude-skills/get-skill.md`: Same content as the API usage article—use it for walkthroughs on loading Skills, managing versions, and Files API workflows until endpoint-specific material is added.
- `claude-skills/list-skills.md`: Another copy of the Skills integration guide with the same container, file download, and conversation management coverage.
- `claude-skills/delete-skill.md`: Raw OpenAPI schema for the `DELETE /v1/skills/{skill_id}` endpoint, including headers and parameter definitions.
- `claude-skills/skill-authoring-best-practices.md`: Pointer to external best-practices documentation for crafting high-quality Skill packages.
