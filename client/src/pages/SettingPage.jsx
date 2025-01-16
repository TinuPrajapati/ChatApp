import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  const renderThemeButton = (t) => (
    <button
      key={t}
      className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
        ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}`}
      onClick={() => setTheme(t)}
    >
      <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
        <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
          {['primary', 'secondary', 'accent', 'neutral'].map(color => (
            <div key={color} className={`rounded bg-${color}`}></div>
          ))}
        </div>
      </div>
      <span className="text-[11px] font-medium truncate w-full text-center">
        {t.charAt(0).toUpperCase() + t.slice(1)}
      </span>
    </button>
  );

  const renderMessage = (message) => (
    <div key={message.id} className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-xl p-3 shadow-sm
          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}`}
      >
        <p className="text-sm">{message.content}</p>
        <p className={`text-[10px] mt-1.5 ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}`}>
          12:00 PM
        </p>
      </div>
    </div>
  );

  return (
    <div className="h-[90%] container mx-auto px-4 py-5 flex gap-4">
      <div className="w-[60%] h-full">
        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-3xl font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7   gap-2">
          {THEMES.map(renderThemeButton)}
        </div>
      </div>

      {/* Preview Section */}
      <div className="w-[40%] h-full">
        <h3 className="text-xl font-semibold mb-3">Preview</h3>
        <div className="rounded-lg border border-base-300 overflow-hidden shadow-lg p-4 bg-base-200">
          {/* Mock Chat UI */}
          <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
            {/* Chat Header */}
            <div className="px-4 py-3 border-b border-base-300 bg-base-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                J
              </div>
              <div>
                <h3 className="font-medium text-sm">John Doe</h3>
                <p className="text-xs text-base-content/70">Online</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
              {PREVIEW_MESSAGES.map(renderMessage)}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-base-300 bg-base-100 flex gap-2 items-center">
              <input
                type="text"
                className="input input-bordered flex-1 text-sm h-10"
                placeholder="Type a message..."
                value="This is a preview"
                readOnly
              />
              <button className="btn btn-primary h-10 min-h-0">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
