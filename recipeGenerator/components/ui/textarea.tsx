//textarea.tsx
import * as React from "react"

import { cn } from "@/lib/utils"


// function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
//   return (
//     <textarea
//       data-slot="textarea"
//       className={cn(
//         "bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-md px-3 py-2 shadow-md outline-none focus-visible:ring-white/30 focus-visible:ring-2 min-h-[100px]",
//         className
//       )}
//       {...props}
//     />
//   );
// }
// export { Textarea };
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-md px-3 py-2 shadow-md outline-none focus-visible:ring-white/30 focus-visible:ring-2 min-h-[100px]",
        className
      )}
      {...props}
    />
  );
}
export { Textarea };



