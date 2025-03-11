// 音效管理器
class SoundManager {
  private static instance: SoundManager;
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private isMuted: boolean = false;

  private constructor() {
    // 预加载音效
    this.preloadSounds();
  }

  // 单例模式
  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  // 预加载所有音效
  private preloadSounds(): void {
    const soundFiles = {
      click: '/sounds/click.mp3',
      correct: '/sounds/correct.mp3',
      wrong: '/sounds/wrong.mp3',
      levelComplete: '/sounds/level-complete.mp3',
      celebration: '/sounds/celebration.mp3',
    };

    // 加载所有音效文件
    for (const [name, path] of Object.entries(soundFiles)) {
      const audio = new Audio(path);
      audio.preload = 'auto';
      this.sounds[name] = audio;
    }
  }

  // 播放指定音效
  public play(soundName: string): void {
    if (this.isMuted) return;
    
    const sound = this.sounds[soundName];
    if (sound) {
      // 如果正在播放，先重置
      sound.currentTime = 0;
      sound.play().catch(error => {
        console.error(`Error playing sound ${soundName}:`, error);
      });
    } else {
      console.warn(`Sound "${soundName}" not found`);
    }
  }

  // 静音/取消静音
  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // 获取当前静音状态
  public getMuteState(): boolean {
    return this.isMuted;
  }

  // 设置静音状态
  public setMuteState(state: boolean): void {
    this.isMuted = state;
  }
}

// 导出单例实例
export const soundManager = SoundManager.getInstance();
