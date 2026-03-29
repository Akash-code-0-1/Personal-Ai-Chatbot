# Sharp AI - Command-Based Knowledge Bot

A powerful, command-driven chat interface for saving, organizing, and retrieving information. Built with Next.js, TypeScript, and PostgreSQL.

## Features

- **Command-based interface** with intuitive syntax
- **Save items** with titles, content, and tags
- **Search functionality** to find saved items
- **Folder organization** for better content management
- **Modern UI** with dark mode support
- **Secure authentication** with JWT and password hashing

## Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- PostgreSQL database

### Environment Setup

1. **Create `.env.local`** file in the root with:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/sharp"
JWT_SECRET="your-super-secret-jwt-key-change-this"
SOCKET_IO_URL="http://localhost:3000"
```

### Installation

1. **Install dependencies:**
```bash
pnpm install
```

2. **Setup database:**
```bash
# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev

# (Optional) Seed demo data
node scripts/setup-demo.js
```

3. **Run development server:**
```bash
pnpm dev
```

4. **Open in browser:**
Navigate to `http://localhost:3000/login`

## Demo Credentials

If you ran the setup script:
- Email: `demo@example.com`
- Password: `password123`

## Available Commands

### /save [title] [content]
Save a new item with title and content.
```
/save My Note This is the content of my note
```

### /find [query]
Search for items by title, content, or tags.
```
/find project notes
```

### /folder create [name]
Create a new folder for organizing items.
```
/folder create Work Notes
```

### /folder list
List all your folders and item counts.
```
/folder list
```

### /help
Show all available commands.
```
/help
```

### /help [command]
Get detailed help for a specific command.
```
/help save
```

## Architecture

### Frontend
- **Framework:** Next.js 16 with App Router
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** React hooks + SWR for data fetching

### Backend
- **API:** Next.js API Routes
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT tokens with HTTP-only cookies
- **Security:** bcrypt password hashing

### Database Schema
- `User`: Account management with email/password
- `Message`: Chat message history
- `Folder`: Content organization
- `Item`: Saved content with tags
- `File`: File uploads (extensible)
- `Reminder`: Future reminder support

## File Structure

```
/app
  /api
    /auth
      /login        - User authentication
      /register     - Account creation
    /messages       - Chat history
    /items          - CRUD for saved items
    /folders        - Folder management
  /chat            - Main chat interface
  /login           - Login page
  /register        - Registration page
  layout.tsx       - Root layout with theme
  page.tsx         - Home redirect

/components
  ChatContainer.tsx    - Main chat UI wrapper
  ChatMessage.tsx      - Message display component
  ChatInput.tsx        - Message input with command hints

/lib
  auth.ts          - JWT and password utilities
  commandParser.ts - Command parsing logic
  prisma.ts        - Prisma client singleton

/prisma
  schema.prisma    - Database schema definition
```

## Key Features Implemented

1. **Authentication System**
   - Secure registration and login
   - JWT token management
   - HTTP-only cookies for auth tokens

2. **Command Parser**
   - Intelligent command parsing with subcommands
   - Argument extraction
   - Help system

3. **Message Management**
   - Save user and AI messages
   - Track command execution
   - Full chat history

4. **Content Organization**
   - Create and manage folders
   - Save items with metadata
   - Tag system for categorization
   - Full-text search

5. **Modern UI/UX**
   - Responsive design (mobile-friendly)
   - Dark mode with custom theme
   - Smooth animations
   - Real-time message updates

## Tech Stack

- Next.js 16
- React 19.2
- TypeScript 5.7
- Tailwind CSS 4.2
- Prisma 5.15
- PostgreSQL 14+
- bcrypt for password hashing
- jsonwebtoken for auth tokens

## Commands Structure

Commands follow this pattern:
```
/[command] [subcommand] [args...]
```

Examples:
- `/save MyTitle My content here`
- `/find search query`
- `/folder create FolderName`
- `/folder list`

## Error Handling

The bot includes comprehensive error handling:
- User-friendly error messages
- Validation for all command inputs
- Database connection error recovery
- Authentication failure feedback

## Future Enhancements

- File upload support with size limits
- Reminder scheduling system
- Advanced search with filters
- Collaboration features
- Real-time sync with Socket.IO
- API documentation

## Deployment

To deploy on Vercel:

1. Push code to GitHub
2. Import project on Vercel
3. Add environment variables in Settings > Environment Variables
4. Run build and deploy

The app is production-ready and will handle:
- Automatic database migrations
- Session management
- Static optimization
- Image optimization

## Support

For issues or questions:
1. Check the `/help` command in the bot
2. Review the command examples above
3. Check the browser console for detailed errors
4. Ensure PostgreSQL is running and accessible

---

Built with Next.js, React, and PostgreSQL. Happy organizing!
