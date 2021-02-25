const formatVolumeIconPath = require('../assets/scripts/main')

describe('formatVolumeIconPath', () => {
  test('volumeLevel greater than 66, icon level equals 3', () => {
    for (i = 0; i < 100; i++){
      let random = (Math.random() * (100-67) + 67)
      expect(formatVolumeIconPath(random)).toBe('./assets/media/icons/volume-level-3.svg')
    }
  })
  
  test('volumeLevel greater than 33, but less than 67', () => {
    for (i = 0; i < 100; i++){
      let random = (Math.random() * (66-34) + 34)
      expect(formatVolumeIconPath(random)).toBe('./assets/media/icons/volume-level-2.svg')
    }
  })
  
  test('volumeLevel greater than 0, but less than 33', () => {
    for (i = 0; i < 100; i++){
      let random = (Math.random() * (33-0) + 0)
      expect(formatVolumeIconPath(random)).toBe('./assets/media/icons/volume-level-1.svg')
    }
  })
  
  test('volumeLevel equal to 0', () => {
      expect(formatVolumeIconPath(0)).toBe('./assets/media/icons/volume-level-0.svg')
  })
})