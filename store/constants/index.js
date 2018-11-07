import { SocialMediaCategory } from '../entities'

export var SocialMediaManager = {
  baseURL: {
    instagramBaseURL: 'https://www.instagram.com/',
    youtubeBaseURL: 'https://www.youtube.com/',
    facebookBaseURL: 'facebook.com/',
    linkedinBaseURL: 'https://www.linkedin.com/',
    vimeoBaseURL: 'https://vimeo.com/'
  },
  urlRegex: {
    instagramRegex: '',
    youtubeRegex: '',
    facebookRegex: '',
    linkedinRegex: ''
  },
  isValidURL: function (url, socialMediaCategory) {
    if (!url || typeof url !== 'string') {
      return false
    }

    if (socialMediaCategory === SocialMediaCategory.Instagram) {
      return url.indexOf(this.baseURL.instagramBaseURL) === 0
    } else if (socialMediaCategory === SocialMediaCategory.Youtube) {
      return url.indexOf(this.baseURL.youtubeBaseURL) === 0
    } else if (socialMediaCategory === SocialMediaCategory.Facebook) {
      return url.indexOf(this.baseURL.facebookBaseURL) !== -1
    } else if (socialMediaCategory === SocialMediaCategory.Linkedin) {
      return url.indexOf(this.baseURL.facebookBaseURL) === 0
    } else if (socialMediaCategory === SocialMediaCategory.Vimeo) {
      return url.indexOf(this.baseURL.vimeoBaseURL) === 0
    }

    return false
  },
  extractYoutubeEmbedURL (url) {
    if (!this.isValidURL(url, SocialMediaCategory.Youtube)) {
      return
    }

    var urlSegments = url.split('=')
    var videoID = urlSegments[urlSegments.length - 1]

    return 'https://www.youtube.com/embed/' + videoID
  },
  extractVimeoEmbedURL (url) {
    if (!this.isValidURL(url, SocialMediaCategory.Vimeo)) {
      return
    }

    var urlSegments = url.split('/')
    var videoID = urlSegments[urlSegments.length - 1]

    return 'https://player.vimeo.com/video/' + videoID
  }
}
