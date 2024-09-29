import { Button } from "@/components/ui/button"
import { LoaderCircle } from "lucide-react"

export function ButtonLoading() {
  return (
    <Button disabled className="w-full">
      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      Loading...
    </Button>
  )
}
