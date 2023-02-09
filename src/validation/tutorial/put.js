module.exports = {
  id: {
    in: ['params'],
    isInt: true,
  },
  title: {
    in: ['body'],
    optional: true,
    isLength: {
      errorMessage: 'Title can not exceed 60 chars',
      options: { max: 60 },
    },
  },
  videoURL: {
    in: ['body'],
    optional: true,
    isURL: true,
  },
  description: {
    in: ['body'],
    optional: true,
  },
};
