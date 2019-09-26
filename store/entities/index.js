export var ProfileSectionType = {
  'GeneralInformation': 0,
  'Skills': 1,
  'PhotoGallery': 2,
  'VideoGallery': 3,
  'Awards': 4,
  'Experience': 5,
  'Education': 6
}

export var ProjectSectionType = {
  'GeneralInformation': 0,
  'Needs': 1,
  'Updates': 2
}

export var SocialMediaCategoryType = {
  'Instagram': 0,
  'Youtube': 1,
  'Facebook': 2,
  'Linkedin': 3,
  'Vimeo': 4
}

export var SortOrientationType = {
  'ASC': 0,
  'DESC': 1
}

export var UserSortCriterion = {
  'None': 0,
  'Name': 1,
  'Email': 2,
  'Role': 3,
  'AccountStatus': 4,
  'ProfileVisibility': 5
}

export var ProjectSortCriterion = {
  'None': 0,
  'Name': 1,
  'City': 2,
  'InitiatorName': 3,
  'Status': 4,
  'Visibility': 5
}

export var VisibilityType = {
  'Everyone': 0,
  'Community': 1,
  'Private': 2
}

export var UserAccountProviderType = {
  'Local': 0,
  'Facebook': 1,
  'Google': 2
}

export var UserAccountStatusType = {
  'Managed': 0,
  'Registered': 1,
  'Confirmed': 2,
  'Enabled': 3,
  'Disabled': 4,
  'Deleted': 5
}

export var ProjectStatusType = {
  'Enabled': 0,
  'Disabled': 1,
  'Deleted': 2
}

export var UserRoleType = {
  'User': 0,
  'Admin': 1,
  'SuperAdmin': 2
}

export var LocaleType = {
  'RO': 'ro',
  'EN': 'en'
}

export var CurrencyType = {
  'Romania Leu': 'RON',
  'US Dollar': 'USD',
  'Euro': 'EUR'
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

export class UpdateProfileSection {
  constructor (addedEntities, removedEntities, updatedEntities) {
    this.AddedEntities   = addedEntities;
    this.RemovedEntities = removedEntities;
    this.UpdatedEntities = updatedEntities;
  }
}
