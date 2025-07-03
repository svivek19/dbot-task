import { toast } from "react-hot-toast";
import { AlertTriangle, Check, X } from "lucide-react";

export const confirmDialog = (message = "Are you sure?", onConfirm) => {
  toast.custom((t) => (
    <div
      style={{
        transform: t.visible ? "scale(1)" : "scale(0.9)",
        opacity: t.visible ? 1 : 0,
        transition: "all .18s ease-out",
      }}
      className="relative flex items-center gap-4 w-[340px] bg-white/30
                 dark:bg-neutral-800/40 backdrop-blur-lg border border-white/20
                 shadow-xl rounded-xl px-5 py-4"
    >
      <span
        className="absolute inset-0 rounded-xl animate-pulse
                       bg-gradient-to-br from-rose-500/30 to-indigo-500/20"
      />

      <AlertTriangle className="relative z-10 shrink-0 text-amber-500 dark:text-amber-400" />

      <p className="relative z-10 text-sm text-gray-800 dark:text-gray-100 flex-1">
        {message}
      </p>

      <div className="relative z-10 flex gap-2 ml-2">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="inline-flex items-center justify-center h-7 w-7 rounded-full
                     bg-gray-200/80 hover:bg-gray-300 dark:bg-neutral-700
                     transition"
          title="Cancel"
        >
          <X className="h-4 w-4" />
        </button>

        <button
          onClick={() => {
            toast.dismiss(t.id);
            onConfirm();
          }}
          className="inline-flex items-center justify-center h-7 px-3 rounded-full
                     bg-gradient-to-r from-rose-500 to-rose-600 text-white
                     hover:from-rose-600 hover:to-rose-700 transition"
        >
          <Check className="h-4 w-4 mr-1" />
          <span className="text-xs font-medium">Yes</span>
        </button>
      </div>
    </div>
  ));
};
