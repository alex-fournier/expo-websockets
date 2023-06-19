import randomString from 'randomstring'

export function getRandomNickname() {
  const randomStringOpts = {
    length: 4,
    readable: true,
    charset: 'hex',
  }

  return `user#${randomString.generate(randomStringOpts)}`
}

export function getRandomId() {
  return randomString.generate()
}
