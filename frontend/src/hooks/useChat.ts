import { useState, useEffect, useCallback, useMemo } from "react"

export type Message = {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: number
}

export type Conversation = {
  id: string
  title: string
  messages: Message[]
  updatedAt: number
}

const STORAGE_KEY = "serena-conversations"

const SIMULATED_RESPONSES = [
  "I hear you. That sounds like a lot to carry — can you tell me more about what's been weighing on you?",
  "It makes complete sense that you'd feel that way. What do you think triggered those feelings today?",
  "Thank you for sharing that with me. Sometimes just saying it out loud is the hardest part. How are you feeling right now, in this moment?",
  "I understand. It's okay to not have all the answers — nobody does. What would feel like a small win for you today?",
  "That's really tough. You're showing a lot of strength by talking about it. What do you usually do when these feelings come up?",
  "I'm here for this. Take your time — is there a specific part of this that feels heaviest to you right now?",
  "It sounds like you're doing your best, and that counts for a lot. What would support look like for you today?",
  "That's a lot to deal with. Sometimes our minds just need to be heard without judgment. What would you tell a friend in your situation?",
]

function pickResponse(): string {
  return SIMULATED_RESPONSES[Math.floor(Math.random() * SIMULATED_RESPONSES.length)]
}

function loadConversations(): Conversation[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

function saveConversations(conversations: Conversation[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations))
  } catch {
    // Storage full or unavailable — silently fail
  }
}

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>(loadConversations)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isAiThinking, setIsAiThinking] = useState(false)

  useEffect(() => {
    saveConversations(conversations)
  }, [conversations])

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeId) ?? null,
    [conversations, activeId]
  )

  const createNewChat = useCallback(() => {
    const newConv: Conversation = {
      id: crypto.randomUUID(),
      title: "New conversation",
      messages: [],
      updatedAt: Date.now(),
    }
    setConversations((prev) => [newConv, ...prev])
    setActiveId(newConv.id)
  }, [])

  const selectConversation = useCallback((id: string) => {
    setActiveId(id)
  }, [])

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isAiThinking) return

      let convId = activeId
      if (!convId) {
        const newConv: Conversation = {
          id: crypto.randomUUID(),
          title: "New conversation",
          messages: [],
          updatedAt: Date.now(),
        }
        setConversations((prev) => [newConv, ...prev])
        convId = newConv.id
        setActiveId(convId)
      }

      const userMessage: Message = {
        id: crypto.randomUUID(),
        text: text.trim(),
        sender: "user",
        timestamp: Date.now(),
      }

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== convId) return c
          return {
            ...c,
            title:
              c.messages.length === 0
                ? text.slice(0, 40) + (text.length > 40 ? "..." : "")
                : c.title,
            messages: [...c.messages, userMessage],
            updatedAt: Date.now(),
          }
        })
      )

      setIsAiThinking(true)

      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1500))

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        text: pickResponse(),
        sender: "ai",
        timestamp: Date.now(),
      }

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== convId) return c
          return {
            ...c,
            messages: [...c.messages, aiMessage],
            updatedAt: Date.now(),
          }
        })
      )

      setIsAiThinking(false)
    },
    [activeId, isAiThinking]
  )

  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id))
      if (activeId === id) {
        setActiveId(null)
      }
    },
    [activeId]
  )

  return {
    conversations,
    activeId,
    activeConversation,
    isAiThinking,
    createNewChat,
    selectConversation,
    sendMessage,
    deleteConversation,
  }
}
