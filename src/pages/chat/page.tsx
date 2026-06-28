import { useState, useCallback } from "react"
import { PanelLeft } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useChat } from "@/hooks/useChat"
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/chat/Sidebar"
import ChatArea from "@/components/chat/ChatArea"

export default function ChatPage() {
  const { signOut } = useAuth()
  const {
    conversations,
    activeId,
    activeConversation,
    isAiThinking,
    createNewChat,
    selectConversation,
    sendMessage,
    deleteConversation,
  } = useChat()

  const [inputValue, setInputValue] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSend = useCallback(() => {
    const text = inputValue
    setInputValue("")
    sendMessage(text)
  }, [inputValue, sendMessage])

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value)
  }, [])

  const handleSignOut = useCallback(async () => {
    await signOut()
  }, [signOut])

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={(id) => {
          selectConversation(id)
          setSidebarOpen(false)
        }}
        onNewChat={() => {
          createNewChat()
          setSidebarOpen(false)
        }}
        onDelete={deleteConversation}
        onSignOut={handleSignOut}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="relative flex flex-1 flex-col overflow-hidden">
        {/* Mobile sidebar toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-3 top-3 z-10 lg:hidden"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <PanelLeft className="h-4 w-4" />
        </Button>

        <ChatArea
          conversation={activeConversation}
          isAiThinking={isAiThinking}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onSend={handleSend}
          onSignOut={handleSignOut}
        />
      </div>
    </div>
  )
}
