module.exports = {
  title: {
    in: ['body'],
    notEmpty: true,
    isLength: {
      errorMessage: 'Title can not exceed 60 chars',
      options: { max: 60 },
    },
  },
  videoURL: {
    in: ['body'],
    notEmpty: true,
    isURL: true,
  },
  description: {
    in: ['body'],
    notEmpty: true,
  },
};
