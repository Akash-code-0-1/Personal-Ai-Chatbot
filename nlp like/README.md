# Sharp AI - Command-Based Knowledge Management Bot

A modern, sleek command-driven chat interface for saving, organizing, and retrieving information. Built with Next.js 16, React 19, TypeScript, and PostgreSQL.

![Sharp AI Preview](/public/preview.jpg)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ with pnpm
- PostgreSQL 14+

### Setup in 3 Steps

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Setup database:**
   ```bash
   # Configure .env.local with your DATABASE_URL first!
   pnpm prisma migrate dev
   ```

3. **Run development server:**
   ```bash
   pnpm dev
   ```

Visit `http://localhost:3000/login`

### Demo Account
- Email: `demo@example.com`
- Password: `password123`

(Create the demo account with: `node scripts/setup-demo.js`)

---

## ✨ Features

### Core Functionality
- 💾 **Save Information** - Store items with titles, content, and tags
- 🔍 **Search & Find** - Full-text search across all saved content
- 📁 **Folder Organization** - Organize items into logical folders
- 🔐 **Secure Authentication** - JWT-based auth with password hashing
- 💬 **Chat Interface** - Modern, responsive chat UI with dark mode
- ⚡ **Real-time Updates** - Instant feedback on all operations

### Command-Based Interface
Execute all operations through simple slash commands:

```bash
/save [title] [content]      # Save new item
/find [query]                # Search items
/folder create [name]        # Create folder
/folder list                 # List all folders
/help                        # Show all commands
```

### Modern Tech Stack
- **Frontend:** Next.js 16 with App Router, React 19, TypeScript
- **Styling:** Tailwind CSS 4.2 with shadcn/ui components
- **Backend:** Node.js API Routes with Prisma ORM
- **Database:** PostgreSQL with advanced query support
- **Security:** bcrypt password hashing, JWT tokens, HTTP-only cookies

---

## 📋 Documentation

- **[SETUP.md](./SETUP.md)** - Detailed installation and configuration guide
- **[COMMANDS.md](./COMMANDS.md)** - Complete command reference and examples
- **[FEATURES.md](./FEATURES.md)** - Detailed feature documentation and architecture

---

## 🎯 Example Workflows

### Workflow 1: Daily Standup Notes
```bash
/folder create Daily Standups
/save 2024-03-29 Completed auth system, starting UI
/save 2024-03-28 Fixed database migrations, reviewed PRs
/find standup 2024
```

### Workflow 2: Learning Progress
```bash
/folder create Learning TypeScript
/save Generics Understanding generic types and constraints
/save Advanced Types Using mapped and conditional types
/find Learning TypeScript
```

### Workflow 3: Project Documentation
```bash
/folder create Project Docs
/save API Reference List all REST endpoints
/save Database Schema Tables and relationships
/save Deployment Guide Production setup instructions
/find Project Documentation
```

---

## 🏗️ Architecture

### Database Schema
```
User (id, email, password, name)
├── Message (id, content, command, role)
├── Item (id, title, content, tags, folderId)
├── Folder (id, name)
└── File (id, name, path, size)
```

### API Routes
```
/api/auth
├── /register       POST  - Create account
├── /login          POST  - Sign in
└── /logout         POST  - Sign out

/api/messages       GET/POST  - Chat history
/api/items          GET/POST  - Content CRUD
/api/folders        GET/POST  - Folder management
```

### File Structure
```
/app
├── layout.tsx          # Root layout
├── page.tsx            # Home (redirects to login)
├── (auth)/
│   ├── login/          # Login page
│   └── register/       # Registration page
├── chat/               # Main chat interface
└── api/                # API endpoints

/components
├── ChatContainer.tsx   # Main chat wrapper
├── ChatMessage.tsx     # Message display
├── ChatInput.tsx       # Message input

/lib
├── auth.ts            # Auth utilities
├── prisma.ts          # Database client
└── commandParser.ts   # Command parsing
```

---

## 🔐 Security

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT tokens with 7-day expiration
- ✅ HTTP-only cookie storage
- ✅ CORS protection
- ✅ Input validation and sanitization
- ✅ No sensitive data in error messages

---

## 🎨 UI/UX

- **Modern Design:** Dark mode optimized, purple + teal color scheme
- **Responsive:** Mobile-first, works on all screen sizes
- **Accessible:** Semantic HTML, ARIA labels, high contrast
- **Smooth:** Animations and transitions for better UX
- **Intuitive:** Command hints and help system

---

## 📦 Dependencies

### Key Packages
- `next@16.2.0` - React framework
- `react@19.2.4` - UI library
- `typescript@5.7.3` - Type safety
- `@prisma/client@5.15.0` - Database ORM
- `bcrypt@5.1.1` - Password hashing
- `jsonwebtoken@9.1.2` - JWT auth
- `date-fns@4.1.0` - Date utilities
- `tailwindcss@4.2.0` - Styling
- `lucide-react@0.564.0` - Icons

---

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project on Vercel
3. Add environment variables
4. Deploy automatically

### Environment Variables
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
SOCKET_IO_URL="http://localhost:3000"
```

---

## 📈 Future Enhancements

- [ ] File upload support (50MB limit)
- [ ] Reminder scheduling system
- [ ] Collaboration & sharing
- [ ] Advanced search filters
- [ ] Real-time sync with Socket.IO
- [ ] Bulk operations
- [ ] Export to CSV/PDF
- [ ] Dark mode auto-detection

---

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Verify PostgreSQL is running
psql --version

# Check DATABASE_URL in .env.local
echo $DATABASE_URL
```

### Migration Issues
```bash
# Reset database (careful!)
pnpm prisma migrate reset

# Re-run migrations
pnpm prisma migrate dev
```

### Port Already in Use
```bash
# Use different port
pnpm dev -- -p 3001
```

---

## 📝 Commands Quick Reference

| Command | Syntax | Purpose |
|---------|--------|---------|
| Save | `/save [title] [content]` | Save new item |
| Find | `/find [query]` | Search items |
| Folder Create | `/folder create [name]` | Create folder |
| Folder List | `/folder list` | Show folders |
| Help | `/help [command]` | Get help |

For more details, see [COMMANDS.md](./COMMANDS.md)

---

## 🤝 Contributing

This is a demo/template project. Feel free to:
- Fork and modify
- Add new features
- Improve documentation
- Report issues

---

## 📄 License

Built with Next.js and modern web technologies.

---

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com)

---

## 💡 Tips

1. **First Time?** Start with `/help` command in the chat
2. **Need Examples?** Check [COMMANDS.md](./COMMANDS.md)
3. **System Issues?** Review [SETUP.md](./SETUP.md)
4. **Deep Dive?** Explore [FEATURES.md](./FEATURES.md)

---

## 🎉 Getting Started Today

```bash
# Clone and setup
git clone <repo>
cd sharp-ai
pnpm install

# Configure database
cp .env.example .env.local
# Edit .env.local with your DATABASE_URL

# Setup database
pnpm prisma migrate dev
node scripts/setup-demo.js

# Run!
pnpm dev

# Visit
# http://localhost:3000/login
# demo@example.com / password123
```

---

## 📞 Support

- 📖 Read the documentation files
- 💬 Check the `/help` command
- 🔍 Review the source code comments
- 🐛 Check browser console for errors

---

**Sharp AI** - Your personal knowledge management companion! 🚀

Built with ❤️ using Next.js, React, and modern web technologies.

---

## Feature Showcase

### Authentication
- Secure registration and login
- Password hashing with bcrypt
- JWT-based session management

### Content Management
- Save items with rich metadata
- Full-text search capabilities
- Organize with folders

### User Interface
- Modern, responsive design
- Dark mode support
- Real-time updates
- Smooth animations

### Developer Experience
- Type-safe with TypeScript
- Clean API design
- Well-documented code
- Easy to extend

---

**Last Updated:** March 2026

**Status:** Production Ready ✅

Enjoy using Sharp AI!
