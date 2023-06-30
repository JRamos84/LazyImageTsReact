import { useRef, useEffect, useState } from "react"
import { ImgHTMLAttributes } from "react"
type LazyImageProps = { src: string }

type ImageNative = ImgHTMLAttributes<HTMLImageElement>

type Props = LazyImageProps & ImageNative


export const LasyImage = ({ src, ...imgProps }: Props): JSX.Element => {
    const node = useRef<HTMLImageElement>(null)
    const [currentSrc, setCurrentSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=")

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            console.log(entries)
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setCurrentSrc(src)
                }
            })
        })
        if (node.current) {
            observer.observe(node.current)
        }
        return () => {
            observer.disconnect()
        }

    }, [src])




    return <img
        ref={node}
        className="rounded bg-gray-300"
        src={currentSrc}
        {...imgProps}
      />

}