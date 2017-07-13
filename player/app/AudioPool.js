import Pool from "./Pool"

const
    allocator = () => {
        return new Audio()
    },
    resetor = (audio) => {
        audio.src = ''
        return audio
    },
    AudioPool = new Pool(allocator, resetor);

export default AudioPool