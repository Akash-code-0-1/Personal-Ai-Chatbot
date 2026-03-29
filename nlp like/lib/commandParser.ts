export interface ParsedCommand {
  command: string;
  subcommand?: string;
  args: string[];
  rawContent: string;
}

export function parseCommand(content: string): ParsedCommand | null {
  const trimmed = content.trim();

  // Check if it starts with /
  if (!trimmed.startsWith('/')) {
    return null;
  }

  // Remove the leading /
  const withoutSlash = trimmed.substring(1);

  // Split by spaces to get parts
  const parts = withoutSlash.split(/\s+/);
  const command = parts[0].toLowerCase();
  const restParts = parts.slice(1);

  // Check if first part of rest is a subcommand (no special chars)
  let subcommand: string | undefined;
  let args: string[] = restParts;

  if (restParts.length > 0 && /^[a-z0-9]+$/i.test(restParts[0])) {
    subcommand = restParts[0].toLowerCase();
    args = restParts.slice(1);
  }

  return {
    command,
    subcommand,
    args,
    rawContent: content,
  };
}

export function isValidCommand(command: string): boolean {
  const validCommands = ['save', 'find', 'folder', 'list', 'delete', 'tag', 'help'];
  return validCommands.includes(command);
}

export function getCommandHelp(command?: string): string {
  const helpText = {
    save: 'Save an item: /save [title] [content]',
    find: 'Find items: /find [query]',
    folder: 'Manage folders: /folder create [name] or /folder list or /folder delete [name]',
    list: 'List items: /list [foldername]',
    delete: 'Delete item: /delete [id]',
    tag: 'Add tags: /tag [itemid] [tag1] [tag2]...',
    help: 'Show this help message',
  };

  if (!command) {
    return Object.entries(helpText)
      .map(([cmd, desc]) => `/${cmd}: ${desc}`)
      .join('\n');
  }

  return helpText[command as keyof typeof helpText] || `No help found for /${command}`;
}
