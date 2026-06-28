import { MessageSquare, Plus, Trash2, PanelLeftClose, ScrollText } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import type { Conversation } from "@/hooks/useChat"

function formatDateLabel(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return "Today"
  if (days === 1) return "Yesterday"
  if (days < 7) return "This Week"
  if (days < 30) return "This Month"
  return "Older"
}

function groupConversations(conversations: Conversation[]) {
  const groups: Record<string, Conversation[]> = {}
  for (const conv of conversations) {
    const label = formatDateLabel(conv.updatedAt)
    if (!groups[label]) groups[label] = []
    groups[label].push(conv)
  }
  return groups
}

interface SidebarProps {
  conversations: Conversation[]
  activeId: string | null
  onSelect: (id: string) => void
  onNewChat: () => void
  onDelete: (id: string) => void
  onSignOut: () => void
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({
  conversations,
  activeId,
  onSelect,
  onNewChat,
  onDelete,
  onSignOut,
  isOpen,
  onClose,
}: SidebarProps) {
  const { user } = useAuth()

  const fullName: string =
    user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "User"
  const email: string = user?.email ?? ""

  const groups = groupConversations(conversations)

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border/40 bg-background transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/40 px-4 py-3">
          <button
            onClick={onNewChat}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 shrink-0 lg:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto py-2">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
              <ScrollText className="h-8 w-8 text-muted-foreground/40" aria-hidden="true" />
              <p className="text-xs text-muted-foreground">No conversations yet</p>
            </div>
          ) : (
            Object.entries(groups).map(([label, items]) => (
              <div key={label} className="mb-3">
                <p className="px-4 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                  {label}
                </p>
                {items.map((conv) => (
                  <div
                    key={conv.id}
                    className={`group relative mx-2 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                      activeId === conv.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <button
                      className="flex flex-1 items-center gap-2 overflow-hidden text-left"
                      onClick={() => onSelect(conv.id)}
                    >
                      <MessageSquare className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span className="truncate">{conv.title}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(conv.id)
                      }}
                      className="ml-auto shrink-0 rounded p-0.5 text-muted-foreground/40 opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                      aria-label={`Delete ${conv.title}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* User section */}
        <div className="border-t border-border/40 px-4 py-3">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
              {fullName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{fullName}</p>
              <p className="truncate text-xs text-muted-foreground">{email}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={onSignOut}>
            Sign out
          </Button>
        </div>
      </aside>
    </>
  )
}
