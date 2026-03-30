# Sharp AI - Complete Feature Guide

## Core Features

### 1. Authentication System
**Location:** `/app/api/auth/`

- **Registration** (`/register`)
  - Create new user account
  - Email and password validation
  - Automatic login after registration
  
- **Login** (`/login`)
  - Email/password authentication
  - JWT token generation
  - Secure HTTP-only cookie storage
  
- **Logout** (`/api/auth/logout`)
  - Clear authentication tokens
  - Session termination

### 2. Chat Interface
**Location:** `/app/chat/`, `/components/ChatContainer.tsx`

- Real-time message display
- User and assistant message differentiation
- Auto-scrolling to newest messages
- Message timestamps
- Responsive design (mobile-friendly)
- Dark mode support
- Smooth animations and transitions

### 3. Command Parser Engine
**Location:** `/lib/commandParser.ts`

Features:
- Intelligent parsing of slash commands
- Subcommand detection (e.g., `/folder create`)
- Argument extraction and validation
- Help system with command descriptions
- Case-insensitive command matching

Example parsing:
```typescript
/folder create My Workspace
→ command: 'folder'
→ subcommand: 'create'
→ args: ['My', 'Workspace']
```

### 4. Content Management

#### Save Items (`/save`)
- Store information with title and content
- Automatic metadata (creation date, user association)
- Support for tags and folder organization
- Database persistence
- Instant feedback on save success

```bash
/save Project Notes Meeting discussed timeline and deliverables
```

#### Find Items (`/find`)
- Full-text search across titles and content
- Tag-based filtering
- Folder-scoped search
- Results display with snippet preview
- Case-insensitive matching

```bash
/find project deliverables
```

#### Folder Organization (`/folder`)
- Create folders for content categorization
- View all folders with item counts
- Delete folders (future enhancement)
- Move items between folders

```bash
/folder create Work Projects
/folder list
```

### 5. Database & Persistence
**Location:** `/prisma/schema.prisma`

**Data Models:**

1. **User**
   - Email (unique)
   - Hashed password
   - Name
   - Creation timestamp

2. **Message**
   - Content text
   - Command tracking
   - Role (user/assistant)
   - Timestamp
   - User association

3. **Item**
   - Title
   - Content
   - Tags array
   - Folder association (optional)
   - Timestamps

4. **Folder**
   - Name
   - User association
   - Item count tracking
   - Timestamps

5. **File** (extensible)
   - Name and path
   - Size and MIME type
   - User association

6. **Reminder** (for future use)
   - Title and content
   - Due date
   - Completion status

### 6. API Endpoints

#### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Sign in
- `POST /api/auth/logout` - Sign out

#### Chat
- `GET /api/messages` - Load message history
- `POST /api/messages` - Send message or command

#### Content
- `GET /api/items` - List items (with search)
- `POST /api/items` - Create new item
- `GET /api/folders` - List folders
- `POST /api/folders` - Create folder

### 7. Security Features
**Location:** `/lib/auth.ts`

- **Password Hashing:** bcrypt with 10 salt rounds
- **JWT Authentication:** 7-day expiration
- **HTTP-only Cookies:** Prevents XSS attacks
- **Secure Session Management:** Automatic token refresh
- **CORS Protection:** Same-origin only by default
- **Input Validation:** All endpoints validate input
- **Error Handling:** No sensitive data in error messages

### 8. UI Components
**Location:** `/components/`

1. **ChatContainer** (`ChatContainer.tsx`)
   - Main chat wrapper
   - Message scrolling
   - Empty state display
   - Header and footer sections

2. **ChatMessage** (`ChatMessage.tsx`)
   - Message display with role-based styling
   - Timestamp formatting (relative time)
   - User/assistant differentiation
   - Smooth animations

3. **ChatInput** (`ChatInput.tsx`)
   - Multi-line message input
   - Auto-expanding textarea
   - Submit button with loading state
   - Shift+Enter for new lines
   - Enter to send
   - Command hint text

### 9. Theme System
**Location:** `/app/globals.css`, `/app/layout.tsx`

Color Scheme:
- **Primary:** Deep purple (`oklch(0.45 0.28 280)`)
- **Secondary:** Teal accent (`oklch(0.65 0.15 160)`)
- **Background:** Light gray (light mode) / Deep blue-black (dark mode)
- **Text:** High contrast for accessibility

Features:
- Automatic dark mode detection
- Smooth color transitions
- Consistent spacing with Tailwind
- Accessible color combinations

### 10. Page Structure

```
/
├── /login          - Authentication page
├── /register       - Account creation
├── /chat           - Main chat interface
└── /api
    ├── /auth       - Authentication endpoints
    ├── /messages   - Chat API
    ├── /items      - Content management
    └── /folders    - Folder management
```

## Advanced Features

### Command Help System
```bash
/help              - Show all commands
/help save         - Show /save command help
/help find         - Show /find command help
/help folder       - Show /folder command help
```

### Real-time Updates
- Messages update instantly
- Folder counts refresh automatically
- Search results displayed immediately
- No page refresh needed

### Error Handling
- User-friendly error messages
- Detailed logs in console for debugging
- Graceful degradation
- Recovery suggestions in error messages

## Technology Stack

### Frontend
- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript 5.7
- **Styling:** Tailwind CSS 4.2
- **UI Components:** shadcn/ui (Radix UI based)
- **Icons:** lucide-react
- **Date Formatting:** date-fns

### Backend
- **Runtime:** Node.js
- **API:** Next.js API Routes
- **ORM:** Prisma 5.15
- **Database:** PostgreSQL 14+
- **Auth:** JWT + bcrypt
- **Validation:** Zod

### Development
- **Package Manager:** pnpm
- **Type Safety:** TypeScript strict mode
- **Linting:** ESLint
- **Code Quality:** Tailwind CSS best practices

## Deployment Ready

The application is configured for production deployment:
- ✅ Environment variable support
- ✅ Database migrations
- ✅ Error logging hooks
- ✅ Performance optimizations
- ✅ Security headers
- ✅ SEO metadata
- ✅ Responsive design
- ✅ Dark mode support

## Future Enhancement Ideas

1. **File Management**
   - Upload files up to 50MB
   - File preview support
   - Delete and rename files

2. **Reminders**
   - Schedule reminders
   - Notification system
   - Recurring reminders

3. **Collaboration**
   - Share folders with other users
   - Permissions system
   - Activity tracking

4. **Advanced Search**
   - Filter by date range
   - Filter by folder
   - Search history
   - Saved searches

5. **Real-time Sync**
   - WebSocket integration
   - Live collaboration
   - Multi-device sync

6. **API Documentation**
   - Swagger/OpenAPI
   - Rate limiting
   - Third-party integrations

---

**Sharp AI** is a feature-complete, production-ready knowledge management tool with a modern, user-friendly interface.
