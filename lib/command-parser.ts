export interface ParsedCommand {
  command: string;
  subcommand?: string;
  args: string[];
  rawInput: string;
}

export function parseCommand(input: string): ParsedCommand | null {
  const trimmed = input.trim();
  if (!trimmed.startsWith('/')) {
    return null;
  }

  const parts = trimmed.substring(1).split(/\s+/);
  const command = parts[0].toLowerCase();
  
  // Check if second word is a valid subcommand
  const commonSubcommands = ['create', 'list', 'upload', 'delete', 'update'];
  let subcommand: string | undefined;
  let argsStartIndex = 1;
  
  if (parts.length > 1 && commonSubcommands.includes(parts[1].toLowerCase())) {
    subcommand = parts[1].toLowerCase();
    argsStartIndex = 2;
  }
  
  const args = parts.slice(argsStartIndex);

  return {
    command,
    subcommand,
    args,
    rawInput: trimmed,
  };
}

export function isValidCommand(command: string): boolean {
  const validCommands = ['save', 'find', 'folder', 'file', 'reminder'];
  return validCommands.includes(command.toLowerCase());
}

export function getCommandHelp(command: string): string {
  const helps: Record<string, string> = {
    save: 'Usage: /save <title>: <content>\nExample: /save My Note: This is important',
    find: 'Usage: /find <query>\nExample: /find important',
    folder: 'Usage: /folder <create|list> [name]\nExample: /folder create work',
    file: 'Usage: /file <upload|list>\nExample: /file list',
    reminder: 'Usage: /reminder <text> [due date]\nExample: /reminder Call John tomorrow 3pm',
  };

  return helps[command.toLowerCase()] || 'Unknown command';
}
