import faker from 'faker'

// faker.locale = 'zh_CN'

export function generateItem() {
  // return {
  //   ...faker.helpers.createCard()
  // }
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    text: faker.lorem.words()
  }
}

export function getData(count = 10) {
  const list = []
  for (var i = 0; i < count; i++) {
    const item = generateItem()
    list.push(item)
  }
  return list
}

export function generateMessage() {
  return {
    avatar: faker.internet.avatar(),
    message: faker.lorem.text()
  }
}
