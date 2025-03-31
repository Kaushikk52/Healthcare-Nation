import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Photos = (props) => {
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const hospitalImgs = import.meta.env.VITE_APP_CLOUDINARY_HOSPITALS

  const openImage = (index) => {
    setCurrentIndex(index)
    setOpen(true)
  }

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % props.images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + props.images.length) % props.images.length)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open) return

      if (e.key === "ArrowRight") {
        nextImage()
      } else if (e.key === "ArrowLeft") {
        prevImage()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open])

  return (
    <div>
      <div className='!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 xl:!grid-cols-4 !gap-4 !py-8'>
        {props.images.map((photo, index) => (
          <img
            key={index}
            src={hospitalImgs + photo}
            alt='ex image'
            className='h-full !rounded-sm !object-cover !object-top !shadow-lg hover:!opacity-75 aspect-[4.3/3] !transition-all !duration-75 !ease-in-out cursor-pointer'
            onClick={() => openImage(index)} // Add click handler
          />
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className=" max-w-[95vw] p-2 sm:max-w-[90vw] md:max-w-[80vw]">
          <div className="relative">

         
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-2 z-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          <div className="relative mx-auto flex items-center justify-center">

            <div className="max-h-[80vh] overflow-hidden">
              <img
                src={hospitalImgs + props.images[currentIndex]}
                alt="ex image"
                className="h-auto max-h-[80vh] w-auto max-w-full object-contain"
              />
            </div>

          </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-2 z-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            </div>
          <div className="mt-2 text-center text-sm text-muted-foreground">
            {currentIndex + 1} / {props.images.length}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Photos;