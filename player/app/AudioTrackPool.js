import Pool from "./Pool"
import AudioTrack from "./AudioTrack"

const
    allocator = (params) => {
      console.log('AudioPool allocator params', params, 'typeof = ' + typeof params)
        return new AudioTrack(params)
    },
    resetor = (audioTrack) => {
        audioTrack.reset()
        return audioTrack
    },
    AudioTrackPool = new Pool(allocator, resetor);

export default AudioTrackPool