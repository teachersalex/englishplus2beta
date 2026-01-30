// src/utils/TypingSoundEngine.js
// Som de teclado real com variação natural
// DNA: Feedback sensorial que faz o aluno SENTIR que está escrevendo

class TypingSoundEngine {
  constructor() {
    this.audioContext = null
    this.audioBuffer = null
    this.enabled = true
    this.isLoading = false
    this.initialized = false
    this.lastPlayTs = 0 // Throttle para digitação rápida
  }

  async init() {
    if (this.initialized) return true
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      
      if (!this.audioBuffer && !this.isLoading) {
        this.isLoading = true
        const response = await fetch('/audio/keySound.mp3')
        const arrayBuffer = await response.arrayBuffer()
        this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
        this.isLoading = false
      }
      
      this.initialized = true
      
      // Restaura estado do mute
      const savedMuted = localStorage.getItem('englishplus_typing_muted')
      if (savedMuted === 'true') {
        this.enabled = false
      }
      
      return true
    } catch (err) {
      console.warn('Não foi possível carregar som de teclado:', err)
      this.isLoading = false
      return false
    }
  }

  play() {
    // Throttle: máximo 1 som a cada 35ms (evita sobrecarga em digitação rápida)
    const now = performance.now()
    if (now - this.lastPlayTs < 35) return
    this.lastPlayTs = now

    if (!this.enabled || !this.audioContext || !this.audioBuffer) return
    
    // Resume se estiver suspenso (política de autoplay)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(() => {})
    }

    // Cria source
    const source = this.audioContext.createBufferSource()
    source.buffer = this.audioBuffer
    
    // Variação natural no pitch (0.9 a 1.1)
    source.playbackRate.value = 0.9 + Math.random() * 0.2
    
    // Variação natural no volume (0.25 a 0.45)
    const gainNode = this.audioContext.createGain()
    gainNode.gain.value = 0.25 + Math.random() * 0.2
    
    // Conecta e toca
    source.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    // Toca só os primeiros 100ms do som
    source.start(0, 0, 0.1)
  }

  toggle() {
    this.enabled = !this.enabled
    localStorage.setItem('englishplus_typing_muted', String(!this.enabled))
    return this.enabled
  }

  setEnabled(value) {
    this.enabled = value
    localStorage.setItem('englishplus_typing_muted', String(!value))
  }
  
  isEnabled() {
    return this.enabled
  }
}

// Singleton - uma única instância para todo o app
export const typingSound = new TypingSoundEngine()
export default TypingSoundEngine