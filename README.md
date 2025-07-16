
# Gemini Frontend Clone

A fully functional, responsive conversational AI chat application built with React, Redux, and TypeScript. This project simulates a Gemini-style AI chat interface with OTP authentication, chatroom management, AI messaging, and modern UX features.

## 🚀 Live Demo

**[View Live Application](https://gemini-frontend-clone-assignment-three.vercel.app/)**

## 📋 Project Overview

This application is a comprehensive frontend implementation of a Gemini-style conversational AI chat interface, built as part of the Kuvaka Tech Frontend Developer assignment. It demonstrates modern React development practices, state management with Redux, and responsive design principles.

### Key Features

#### Authentication
- **OTP-based Login/Signup** with country code selection
- **Country data fetching** from external API (restcountries.com)
- **Simulated OTP validation** using setTimeout
- **Form validation** with React Hook Form + Zod
- **Persistent authentication** using localStorage

#### Dashboard
- **Chatroom management** - Create, view, and delete chatrooms
- **Search functionality** - Debounced search to filter chatrooms
- **Toast notifications** for user actions
- **Responsive layout** for chatrooms

#### Chat Interface
- **Real-time messaging** with user and AI messages
- **Typing indicators** - "Gemini is typing..."
- **Simulated AI responses** with throttling and delays
- **Auto-scroll** to latest messages
- **Message timestamps** with relative time formatting
- **Copy-to-clipboard** feature on message hover
- **Image upload support** with preview functionality
- **Reverse infinite scroll** for loading older messages
- **Client-side pagination** (20 messages per page)

#### Global UX Features
- **Mobile responsive design** - Optimized for all screen sizes
- **Dark mode toggle** - Seamless theme switching
- **Loading skeletons** for enhanced user experience
- **Keyboard accessibility** for all interactions
- **Toast notifications** for key actions
- **localStorage persistence** for auth and chat data

## 📦 Setup and Run Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/gaurav091100/Gemini-Frontend-Clone-Assignment.git
   cd Gemini-Frontend-Clone-Assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production
```bash
npm run build
```

### Component Architecture
- **Modular Design**: Each component is focused on a single responsibility
- **Reusable Components**: UI components are built for reusability
- **Custom Hooks**: Business logic is extracted into custom hooks
- **Type Safety**: Full TypeScript coverage with strict typing

## 🔧 Implementation Details

### Throttling Implementation
AI responses are throttled to simulate realistic conversation flow:

```typescript
// In ChatInterface.tsx
const simulateAIResponse = async (userMessage: string, userImage?: string) => {
  dispatch(setTyping(true));
  
  // Simulate AI thinking time (1-3 seconds)
  const thinkingTime = Math.random() * 2000 + 1000;
  
  setTimeout(() => {
    // Generate AI response
    const aiMessage = generateAIResponse(userMessage, userImage);
    dispatch(addMessage(aiMessage));
    dispatch(setTyping(false));
  }, thinkingTime);
};
```

### Pagination Implementation
Client-side pagination for efficient message rendering:

```typescript
// In ChatInterface.tsx
const [page, setPage] = useState(1);
const displayedMessages = messages.slice(0, page * 20);

const loadMoreMessages = () => {
  if (displayedMessages.length < messages.length) {
    setPage(prev => prev + 1);
  }
};
```

### Infinite Scroll Implementation
Reverse infinite scroll for loading older messages:

```typescript
// In ChatInterface.tsx
const handleScroll = () => {
  const container = messagesContainerRef.current;
  if (container && container.scrollTop === 0 && displayedMessages.length < messages.length) {
    loadMoreMessages();
  }
};

// Auto-scroll to bottom for new messages
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages.length]);
```

### Form Validation Implementation
React Hook Form with Zod schema validation:

```typescript
// In LoginForm.tsx
const phoneSchema = z.object({
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  countryCode: z.string().min(2, 'Please select a country'),
});

const phoneForm = useForm<PhoneFormData>({
  resolver: zodResolver(phoneSchema),
  defaultValues: { phone: '', countryCode: '' },
});
```

### State Management with Redux
Modular Redux slices for different application domains:

```typescript
// authSlice.ts - Authentication state
// chatSlice.ts - Chat messages and rooms
// themeSlice.ts - Theme preferences

// Persistent state using localStorage
const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthFromStorage(),
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      saveAuthToStorage(state);
    },
  },
});
```

### Debounced Search
Efficient search implementation with debouncing:

```typescript
// In chatSlice.ts
const selectFilteredChatRooms = createSelector(
  [(state: RootState) => state.chat.chatRooms, (state: RootState) => state.chat.searchQuery],
  (chatRooms, searchQuery) => {
    if (!searchQuery.trim()) return chatRooms;
    return chatRooms.filter(room =>
      room.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
);
```

### Responsive Design
Mobile-first approach with Tailwind CSS:

## 🎨 Design System

The application uses a comprehensive design system:

- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for consistent component library
- **Custom theme tokens** for dark/light mode support
- **Responsive breakpoints** for multi-device support
- **HSL color system** for better theme management

### Theme Implementation
```typescript
// Custom CSS variables for theming
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
}

[data-theme="dark"] {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 0 0% 98%;
}
```

## 🚀 Deployment

The application is deployed on **Vercel**

**Technologies Used**: React • TypeScript • Redux • React Hook Form + Zod • Tailwind CSS • Vite • shadcn/ui

##  📸 Screenshots

Dekstop View
![Uploading Screenshot 2025-07-16 184438.png…]()
<img width="1909" height="899" alt="Screenshot 2025-07-16 184507" src="https://github.com/user-attachments/assets/a9629bb5-c4b0-498c-ada1-f94efad4b543" />
<img width="1892" height="890" alt="Screenshot 2025-07-16 184543" src="https://github.com/user-attachments/assets/d7f25afc-fac0-41de-9242-bf39922be677" />
<img width="1889" height="890" alt="Screenshot 2025-07-16 184556" src="https://github.com/user-attachments/assets/c99099f7-d91b-4aa6-a555-7d1a67a83cb3" />
<img width="634" height="518" alt="Screenshot 2025-07-16 184610" src="https://github.com/user-attachments/assets/67a769f9-9201-45a7-9f74-592fd70d964a" />
<img width="1892" height="897" alt="Screenshot 2025-07-16 184624" src="https://github.com/user-attachments/assets/9c8b9afb-ee9f-401f-ac74-18e0fd7cbcd3" />

Mobile View
<img width="438" height="788" alt="Screenshot 2025-07-16 190644" src="https://github.com/user-attachments/assets/5ad80d19-924e-47a4-88ff-e1b1609c1b9f" />
<img width="441" height="787" alt="Screenshot 2025-07-16 190527" src="https://github.com/user-attachments/assets/dc8e2441-8c06-48cd-9189-b58923648b6b" />
<img width="446" height="794" alt="Screenshot 2025-07-16 190539" src="https://github.com/user-attachments/assets/9589cc38-d3b1-4379-bcea-79126b34c33f" />
