import type { Message } from "@/lib/types";

export const demoMessages: Message[] = [
  {
    id: "msg-1",
    content:
      "Hi Gemini! I'm working on a sci-fi story about time travel. Can you help me brainstorm some unique plot twists?",
    isUser: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    chatRoomId: "demo-1",
  },
  {
    id: "msg-2",
    content:
      "That's a fantastic story idea! Let me help you develop it further. Here are some unique time travel plot twists:\n\n1. The protagonist discovers they're actually preventing their own birth\n2. Time travel creates parallel universes, and they must choose which reality to preserve\n3. They realize they're trapped in a time loop created by their future self\n\nWhich direction interests you most?",
    isUser: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    chatRoomId: "demo-1",
  },
  {
    id: "msg-3",
    content:
      "Can you review this React component for performance issues?\n\n```jsx\nconst UserList = ({ users }) => {\n  return (\n    <div>\n      {users.map(user => (\n        <UserCard key={user.id} user={user} />\n      ))}\n    </div>\n  );\n};\n```",
    isUser: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5),
    chatRoomId: "demo-2",
  },
  {
    id: "msg-4",
    content:
      "Your React component looks good! Here are some optimization suggestions:\n\n1. **Memoization**: Wrap with React.memo if users prop doesn't change often\n2. **Key optimization**: Your key={user.id} is perfect\n3. **Consider virtualization**: For large lists, use react-window\n4. **Loading states**: Add skeleton components for better UX\n\nThe component follows React best practices well!",
    isUser: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    chatRoomId: "demo-2",
  },
  {
    id: "msg-5",
    content:
      "Help me plan a productive day. I have a presentation to prepare, emails to catch up on, and a project deadline tomorrow.",
    isUser: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6.5),
    chatRoomId: "demo-3",
  },
  {
    id: "msg-6",
    content:
      "Here's a structured plan for your productive day ahead!\n\n**Morning (9-11 AM):**\n- Presentation prep (2 hours of focused work)\n- Break every 45 minutes\n\n**Mid-Morning (11-12 PM):**\n- Email catch-up (batch process)\n\n**Afternoon (1-4 PM):**\n- Project work (3 hours with the deadline in mind)\n- Use Pomodoro technique\n\n**Evening:**\n- Final presentation review\n- Prepare for tomorrow\n\nPrioritize the deadline project if you're running behind!",
    isUser: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    chatRoomId: "demo-3",
  },
];
