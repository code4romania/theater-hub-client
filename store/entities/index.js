export var SocialMediaCategory = {
  'Instagram': 1,
  'Youtube': 2,
  'Facebook': 3,
  'Linkedin': 4,
  'Vimeo': 5
}

export class Wish {
  constructor (title, description) {
    this.title = title
    this.description = description
  }
}

export class EducationStep {
  constructor (name, title, startDate, endDate) {
    this.name = name
    this.title = title
    this.startDate = startDate
    this.endDate = endDate
  }
}
