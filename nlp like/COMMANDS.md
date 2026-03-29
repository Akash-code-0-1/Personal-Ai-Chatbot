# Sharp AI - Command Reference

## Quick Start

Login with demo credentials:
- **Email:** `demo@example.com`
- **Password:** `password123`

Or create a new account at `/register`

---

## Command Syntax

All commands start with `/` followed by the command name:

```
/[command] [subcommand] [arguments...]
```

---

## Commands

### /save - Save Information
Save new items with title and content.

**Syntax:**
```
/save [title] [content]
```

**Examples:**
```
/save Meeting Notes Discussed Q4 roadmap and team structure
/save Code Snippet function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }
/save Book Summary The Pragmatic Programmer teaches modern software development practices
```

**Result:**
- ✅ Item saved with ID
- Item appears in search results
- Can be organized in folders
- Can have tags added

---

### /find - Search Items
Find saved items by searching titles, content, and tags.

**Syntax:**
```
/find [search query]
```

**Examples:**
```
/find meeting
/find Q4 roadmap
/find code snippet
/find books learning
```

**Result:**
- 📝 Shows matching items
- Displays item title and content preview
- Count of results
- Items sorted by relevance

---

### /folder - Manage Folders
Organize items into folders for better structure.

#### Create a Folder
```
/folder create [folder name]
```

**Examples:**
```
/folder create Work Projects
/folder create Personal Learning
/folder create Code Snippets
```

**Result:**
- ✅ Folder created
- Ready to organize items
- Appears in folder list

#### List All Folders
```
/folder list
```

**Result:**
- 📂 Shows all your folders
- Displays count of items in each
- Can see folder structure

#### Delete a Folder
```
/folder delete [folder name]
```

**Examples:**
```
/folder delete Archive
```

**Result:**
- ✅ Folder deleted
- Items moved to root or updated
- No longer appears in list

---

### /help - Get Help
View available commands and get detailed help.

**Syntax:**
```
/help              - Show all commands
/help [command]    - Show help for specific command
```

**Examples:**
```
/help              - Show complete command list
/help save         - Show /save command details
/help find         - Show /find command details
/help folder       - Show /folder command details
```

**Result:**
- 📖 Command descriptions
- Usage examples
- Available options
- Tips and tricks

---

## Tips & Tricks

### 1. Multi-word Searches
Use the exact phrase for better results:
```
/find project timeline
```

### 2. Organizing Items
Create folders first, then save related items:
```
/folder create 2024 Planning
/save Q1 Goals First quarter objectives...
/save Q2 Goals Second quarter objectives...
```

### 3. Tag-based Search
Add descriptive titles for better searching:
```
/save Python-Tips Using list comprehensions efficiently
/save Python-Tips Dictionary unpacking patterns
```

### 4. Content Preview
When searching, results show first 50 characters:
```
/find learning
→ Shows title and brief content preview
```

### 5. Command Hints
The input field shows hints for available commands:
```
Type "/" to see command suggestions
```

---

## Real-world Workflows

### Scenario 1: Daily Notes
```
/folder create Daily Standup 2024
/save 2024-03-29 Completed API endpoints, started frontend
/save 2024-03-28 Reviewed PR, deployed hotfix
/find standup 2024
```

### Scenario 2: Learning Log
```
/folder create Learning TypeScript
/save Generics Understanding TS generics with <T>
/save Utility Types Using Pick, Omit, and Partial
/find Learning TypeScript
```

### Scenario 3: Project Documentation
```
/folder create Project Alpha
/save Architecture Overview System design and components
/save API Endpoints REST endpoints and response formats
/save Database Schema User, Item, Folder models
/find Project Alpha
```

---

## Common Questions

### Q: Can I edit saved items?
**A:** Currently you can save new versions. This feature will be added soon.

### Q: How do I delete items?
**A:** Use `/delete [item-id]` command (coming soon).

### Q: Can I share folders?
**A:** Sharing is a planned feature for future releases.

### Q: How much can I save?
**A:** Unlimited items. Storage depends on your database plan.

### Q: Are my items private?
**A:** Yes, all items are private to your account. Only you can see them.

### Q: Can I use multiple accounts?
**A:** Yes, each person should create their own account with unique email.

### Q: What if I forget the command syntax?
**A:** Type `/help` anytime to see all commands and their syntax.

---

## Command Cheat Sheet

| Command | Syntax | Purpose |
|---------|--------|---------|
| Save | `/save [title] [content]` | Save new item |
| Find | `/find [query]` | Search items |
| Folder Create | `/folder create [name]` | Create folder |
| Folder List | `/folder list` | Show folders |
| Folder Delete | `/folder delete [name]` | Delete folder |
| Help | `/help [command]` | Get help |

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Send message |
| `Shift + Enter` | New line in message |
| `Ctrl + A` | Select all text |
| `Ctrl + C` | Copy text |
| `Ctrl + V` | Paste text |

---

## Best Practices

✅ **DO:**
- Use clear, descriptive titles
- Organize items in logical folders
- Search before saving duplicates
- Use concise content summaries
- Add context to your notes

❌ **DON'T:**
- Save sensitive passwords or API keys
- Use very long titles
- Mix unrelated items in one save
- Forget to check help when stuck
- Leave important items unsaved

---

## Error Messages & Solutions

### "Please provide: /save [title] [content]"
**Problem:** Missing title or content
**Solution:** Include both title and content in your save command

### "No items found matching..."
**Problem:** Search returned no results
**Solution:** Try simpler search terms or check your saved items with `/folder list`

### "Failed to save item"
**Problem:** Database or server error
**Solution:** Check your connection and try again

### "Unauthorized"
**Problem:** Not logged in
**Solution:** Login at `/login` page

---

## Getting Help

1. **In-app Help**
   - Type `/help` anytime
   - Type `/help [command]` for specific command help

2. **Documentation**
   - Read `SETUP.md` for installation
   - Read `FEATURES.md` for detailed features
   - Read `COMMANDS.md` for command reference (this file)

3. **Troubleshooting**
   - Check browser console for errors (F12)
   - Verify PostgreSQL is running
   - Ensure database URL is correct

---

## Demo Workflow

Try this workflow to learn the bot:

1. **Login**
   ```
   demo@example.com / password123
   ```

2. **Create a Folder**
   ```
   /folder create My First Folder
   ```

3. **Save an Item**
   ```
   /save Hello World This is my first saved item!
   ```

4. **Search Items**
   ```
   /find Hello
   ```

5. **List Folders**
   ```
   /folder list
   ```

6. **Get Help**
   ```
   /help
   ```

---

Enjoy using Sharp AI! Happy organizing! 🚀
