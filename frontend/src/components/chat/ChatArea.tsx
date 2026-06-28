import { useRef, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import MessageInput from "@/components/chat/MessageInput"
import type { Conversation, Message } from "@/hooks/useChat"

interface ChatAreaProps {
  conversation: Conversation | null
  isAiThinking: boolean
  inputValue: string
  onInputChange: (value: string) => void
  onSend: () => void
  onSignOut: () => void
}

function AssistantAvatar() {
  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
      S
    </div>
  )
}

function UserAvatar() {
  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary-foreground/20 text-xs font-semibold text-foreground">
      Y
    </div>
  )
}

function AiBubble({ message }: { message: Message }) {
  return (
    <div className="chat-bubble flex justify-start" style={{ animationDelay: "0ms" }}>
      <div className="flex max-w-[80%] items-start gap-3">
        <div className="pt-0.5">
          <AssistantAvatar />
        </div>
        <p
          className="rounded-[18px_18px_18px_4px] px-4 py-2.5 text-sm leading-relaxed text-foreground"
          style={{
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {message.text}
        </p>
      </div>
    </div>
  )
}

function UserBubble({ message }: { message: Message }) {
  return (
    <div className="chat-bubble flex justify-end" style={{ animationDelay: "0ms" }}>
      <div className="flex max-w-[80%] items-start gap-3">
        <p className="rounded-[18px_18px_4px_18px] bg-primary px-4 py-2.5 text-sm leading-relaxed text-primary-foreground">
          {message.text}
        </p>
        <div className="pt-0.5">
          <UserAvatar />
        </div>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="chat-bubble flex justify-start" style={{ animationDelay: "0ms" }}>
      <div className="flex items-start gap-3">
        <div className="pt-0.5">
          <AssistantAvatar />
        </div>
        <div
          className="flex items-center gap-1 rounded-[18px_18px_18px_4px] px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
          aria-label="Serena is typing"
        >
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60 [animation-delay:0ms]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60 [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  )
}

export default function ChatArea({
  conversation,
  isAiThinking,
  inputValue,
  onInputChange,
  onSend,
  onSignOut,
}: ChatAreaProps) {
  const { user } = useAuth()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation?.messages, isAiThinking])

  if (!conversation || conversation.messages.length === 0) {
    return (
      <div className="flex h-full flex-col">
        <header className="flex shrink-0 items-center justify-between border-b border-border/40 px-4 py-3 sm:px-6">
          <div>
            <h2 className="text-sm font-medium text-foreground">Serena</h2>
            <p className="text-xs text-muted-foreground">New conversation</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onSignOut}>
            Sign out
          </Button>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <span className="text-2xl font-semibold text-primary">S</span>
            </div>
            <h1 className="text-xl font-medium text-foreground">
              Hi{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""}
            </h1>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              How can I help you feel better today? I&apos;m here to listen — no judgment, just
              support.
            </p>
          </div>

          <div className="mt-8 w-full max-w-xl">
            <MessageInput
              value={inputValue}
              onChange={onInputChange}
              onSend={onSend}
              disabled={isAiThinking}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex shrink-0 items-center justify-between border-b border-border/40 px-4 py-3 sm:px-6">
        <div>
          <h2 className="text-sm font-medium text-foreground">Serena</h2>
          <p className="text-xs text-muted-foreground">{conversation.title}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onSignOut}>
          Sign out
        </Button>
      </header>

      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6 sm:px-6"
      >
        <div className="mx-auto flex max-w-2xl flex-col gap-5">
          {conversation.messages.map((msg) =>
            msg.sender === "user" ? (
              <UserBubble key={msg.id} message={msg} />
            ) : (
              <AiBubble key={msg.id} message={msg} />
            )
          )}
          {isAiThinking && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="shrink-0 border-t border-border/40 px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <MessageInput
            value={inputValue}
            onChange={onInputChange}
            onSend={onSend}
            disabled={isAiThinking}
          />
        </div>
      </div>
    </div>
  )
}
