import _                            from 'lodash';
import moment                       from 'moment';
import validator                    from 'validator';
import { SocialMediaCategoryType,
                  VisibilityType }  from '../store/entities';

export var SocialMediaManager = {
  baseURL: {
    instagramBaseURL: 'instagram.com',
    youtubeBaseURL: 'youtube.com',
    facebookBaseURL: 'facebook.com',
    linkedinBaseURL: 'linkedin.com',
    vimeoBaseURL: 'vimeo.com'
  },
  isValidURL (url, socialMediaCategory) {
    if (!url || typeof url !== 'string' || !Validators.isValidURL(url)) {
      return false;
    }

    if (socialMediaCategory === SocialMediaCategoryType.Instagram) {
      return url.includes(this.baseURL.instagramBaseURL);
    } else if (socialMediaCategory === SocialMediaCategoryType.Youtube) {
      return url.includes(this.baseURL.youtubeBaseURL);
    } else if (socialMediaCategory === SocialMediaCategoryType.Facebook) {
      return url.includes(this.baseURL.facebookBaseURL);
    } else if (socialMediaCategory === SocialMediaCategoryType.Linkedin) {
      return url.includes(this.baseURL.linkedinBaseURL);
    } else if (socialMediaCategory === SocialMediaCategoryType.Vimeo) {
      return url.includes(this.baseURL.vimeoBaseURL);
    }

    return false;
  },
  isVideoValid (videoLink) {
      return videoLink &&
          (this.isValidURL(videoLink, SocialMediaCategoryType.Youtube) || this.isValidURL(videoLink, SocialMediaCategoryType.Vimeo));
  },
  extractYoutubeEmbedURL (url) {
    if (!this.isValidURL(url, SocialMediaCategoryType.Youtube)) {
      return;
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
      return;
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
    },
    getAge (birthDate) {
      var currentDateMoment = moment(new Date());
      var birthDateMoment   = moment(birthDate);

      return Math.floor(moment.duration(currentDateMoment.diff(birthDateMoment)).asYears());
    },
    getPrivacyElementText (value) {
        return (_.invert(VisibilityType))[value].toLowerCase();
    }
}

export var Validators = {
  isValidEmailAddress (emailAddress) {
    return validator.isEmail(emailAddress);
  },
  isValidPassword (password) {
    if (password.length < 7 || password.length > 50) {
      return false;
    }

    var lowerCasePassword = password.toLowerCase();
    var upperCasePassword = password.toUpperCase();

    return lowerCasePassword !== password &&
    upperCasePassword !== password &&
    lowerCasePassword !== upperCasePassword;
  },
  isValidPhoneNumber (phoneNumber) {
    if (!phoneNumber || phoneNumber.length > 15) {
      return false;
    }

    phoneNumber = phoneNumber.replace(/\s/g, '');
    if (phoneNumber[0] === '+') {
      phoneNumber = phoneNumber.substring(1, phoneNumber.length);
    }
    if (phoneNumber[0] === '0') {
      phoneNumber = phoneNumber.substring(1, phoneNumber.length);
    }

    if (phoneNumber.length > 15) {
      return false;
    }

    var parsedPhoneNumber = parseInt(phoneNumber);

    return !!parsedPhoneNumber &&
      parsedPhoneNumber.toString().length === phoneNumber.length &&
      phoneNumber.length >= 6;
  },
  isValidBirthDate (birthDate) {
    return moment().diff(new Date(birthDate), 'years') >= 18;
  },
  isValidURL (url) {
    return validator.isURL(url);
  },
  isValidBudget (budget) {
    return _.isNumber(budget) && budget >= 0;
  }

}

export var HtmlHelpers = {
  cloneElementDimensions (source, target) {
    target.style.width  = `${source.offsetWidth}px`;
    target.style.height = `${source.offsetHeight}px`;
    target.style.left   = source.offsetLeft;
    target.style.top    = source.offsetTop;
  },
  cloneBodyDimensions (target) {
    var body = document.getElementsByTagName('body')[0];

    this.cloneElementDimensions(body, target);
    target.style.minHeight  = target.style.height;
    target.style.width      = '100%';
    target.style.height     = '100%';
  },
  isVerticallyFullyInViewport (element) {
    if (!element) {
      return;
    }

    var clientRect = element.getBoundingClientRect();

    return clientRect.top >= 0 && clientRect.bottom <= window.innerHeight;
  },
  scrollToElement (element, offsetY = 0) {
    if (!element) {
      return;
    }

    const pageScrollTop     = document.documentElement.scrollTop;
    const pageBottom        = pageScrollTop + document.documentElement.clientHeight;
    const elementTop        = pageScrollTop + element.getBoundingClientRect().top;
    const elementHeight     = element.offsetHeight;
    const elementBottom     = elementTop + elementHeight;

    if (elementTop < pageScrollTop) {
      window.scrollTo(0, elementTop + offsetY);
    } else if (elementBottom > pageBottom) {
      window.scrollTo(0, pageScrollTop + (elementBottom - pageBottom) + offsetY);
    }
  }
}
