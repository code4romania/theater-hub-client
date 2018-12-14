import _                            from 'lodash';
import moment                       from 'moment';
import validator                    from 'validator';
import { SocialMediaCategoryType }  from '../store/entities';

export var SocialMediaManager = {
  baseURL: {
    instagramBaseURL: 'https://www.instagram.com',
    youtubeBaseURL: 'https://www.youtube.com',
    facebookBaseURL: 'facebook.com',
    linkedinBaseURL: 'https://www.linkedin.com',
    vimeoBaseURL: 'https://vimeo.com'
  },
  isValidURL (url, socialMediaCategory) {
    if (!url || typeof url !== 'string' || !Validators.isValidURL(url)) {
      return false;
    }

    if (socialMediaCategory === SocialMediaCategoryType.Instagram) {
      return url.indexOf(this.baseURL.instagramBaseURL) === 0;
    } else if (socialMediaCategory === SocialMediaCategoryType.Youtube) {
      return url.indexOf(this.baseURL.youtubeBaseURL) === 0;
    } else if (socialMediaCategory === SocialMediaCategoryType.Facebook) {
      return url.indexOf(this.baseURL.facebookBaseURL) !== -1;
    } else if (socialMediaCategory === SocialMediaCategoryType.Linkedin) {
      return url.indexOf(this.baseURL.linkedinBaseURL) === 0;
    } else if (socialMediaCategory === SocialMediaCategoryType.Vimeo) {
      return url.indexOf(this.baseURL.vimeoBaseURL) === 0;
    }

    return false;
  },
  isVideoValid (videoLink) {
      return videoLink &&
          (this.isValidURL(videoLink, SocialMediaCategoryType.Youtube) || this.isValidURL(videoLink, SocialMediaCategoryType.Vimeo));
  },
  extractYoutubeEmbedURL (url) {
    if (!this.isValidURL(url, SocialMediaCategoryType.Youtube)) {
      return
    }
    var videoID     = '';
    var urlSegments = url.split('v=');
    var index       = urlSegments[urlSegments.length - 1].indexOf('&');
    if (index !== -1) {
      videoID = urlSegments[urlSegments.length - 1].substring(0, index);
    } else {
      videoID = urlSegments[urlSegments.length - 1];
    }

    return 'https://www.youtube.com/embed/' + videoID;
  },
  extractVimeoEmbedURL (url) {
    if (!this.isValidURL(url, SocialMediaCategoryType.Vimeo)) {
      return
    }

    var videoID     = '';
    var urlSegments = url.split('/');
    var index = urlSegments[urlSegments.length - 1].indexOf('&');
    if (index !== -1) {
      videoID = urlSegments[urlSegments.length - 1].substring(0, index);
    } else {
      videoID = urlSegments[urlSegments.length - 1];
    }

    return 'https://player.vimeo.com/video/' + videoID;
  },
  extractEmbedURLFromUnknownProvider (url) {
    var embedLink = '';

    if (this.isValidURL(url, SocialMediaCategoryType.Youtube)) {
      embedLink = this.extractYoutubeEmbedURL(url);
    } else if (this.isValidURL(url, SocialMediaCategoryType.Vimeo)) {
      embedLink = this.extractVimeoEmbedURL(url);
    }

    return embedLink;
  }
}

export var Helpers = {
    cloneObject (sourceObject) {
        return _.cloneDeep(sourceObject);
    }
}

export var Validators = {
  isValidEmailAddress (emailAddress) {
    return validator.isEmail(emailAddress);
  },
  isValidPassword (password) {
    if (password.length < 7 || password.length > 100) {
      return false;
    }

    var lowerCasePassword = password.toLowerCase();
    var upperCasePassword = password.toUpperCase();

    return lowerCasePassword !== password &&
    upperCasePassword !== password &&
    lowerCasePassword !== upperCasePassword;
  },
  isValidPhoneNumber (phoneNumber) {
    phoneNumber = phoneNumber.replace(/\s/g, '');
    if (phoneNumber[0] === '+') {
      phoneNumber = phoneNumber.substring(1, phoneNumber.length);
    }
    if (phoneNumber[0] === '0') {
      phoneNumber = phoneNumber.substring(1, phoneNumber.length);
    }

    var parsedPhoneNumber = parseInt(phoneNumber);

    return !!parsedPhoneNumber && parsedPhoneNumber.toString().length === phoneNumber.length && phoneNumber.length >= 6;
  },
  isValidBirthDate (birthDate) {
    return moment().diff(new Date(birthDate), 'years') >= 18;
  },
  isValidURL (url) {
    return validator.isURL(url);
  }

}
