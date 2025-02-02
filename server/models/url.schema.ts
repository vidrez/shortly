import { defineMongooseModel } from '#nuxt/mongoose'

const isURL = (url: string) => {
  try {
    new URL(url)
    return true
  }
  catch {
    return false
  }
}

export const UrlSchema = defineMongooseModel({
  name: 'Url',
  schema: {
    destination: {
      type: String,
      required: true,
      validate: {
        validator: isURL,
        message: 'Invalid URL',
      },
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    expiryDate: {
      type: Date,
      required: false,
    },
  },
  options: {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        delete ret.password
        return ret
      },
    },
  },
})
