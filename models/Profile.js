const mongoose = require("mongoose");
const validator = require("validator");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    trim: true,
    required: true,
    validate(value) {
      if (!value) {
        throw new Error("Status must be provided!");
      }
    }
  },
  skills: {
    type: [String],
    required: true,
    trim: true,
    validate(value) {
      if (value.length === 0) {
        throw new Error("Skills must be provided!");
      }
    }
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
        validate(value) {
          if (!value) {
            throw new Error("Title must be provided!");
          }
        }
      },
      company: {
        type: String,
        required: true,
        validate(value) {
          if (!value) {
            throw new Error("Company must be provided!");
          }
        }
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true,
        validate(value) {
          if (!value) {
            throw new Error("From date must be provided!");
          }
        }
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
        validate(value) {
          if (!value) {
            throw new Error("School must be provided!");
          }
        }
      },
      degree: {
        type: String,
        required: true,
        validate(value) {
          if (!value) {
            throw new Error("Degree must be provided!");
          }
        }
      },
      fieldofstudy: {
        type: String,
        required: true,
        validate(value) {
          if (!value) {
            throw new Error("Field of study must be provided!");
          }
        }
      },
      from: {
        type: Date,
        required: true,
        validate(value) {
          if (!value) {
            throw new Error("From date must be provided!");
          }
        }
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
